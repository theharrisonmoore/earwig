const boom = require("boom");

const {
  getQuetionsByOrg,
  getOrganizationById,
  getOrganization,
  getQuestionsByOrgCategory,
  getOrgsNamesByType,
  getAgenciesAndPayrollsNames,
  getReviewDetails,
  findReviewByIdAndUpdate,

} = require("../database/queries/review");

// const { getOrgsReviewedLast30D } = require("./../database/queries/reviews");

const { findByEmail } = require("../database/queries/user");

const Review = require("../database/models/Review");
const Answer = require("../database/models/Answer");
const Comment = require("../database/models/Comment");

const getByOrg = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: orgId } = req.params;

  const { category, name } = await getOrganizationById(orgId);

  try {
    // if (!req.query.edit) {
    //   // check if the user gave a review recently
    //   const reviewdOrgsIn30D = await getOrgsReviewedLast30D(userId);
    //   const gaveReviewIn30D = reviewdOrgsIn30D
    //     .some(item => item.organization.toString() === orgId);
    //   if (gaveReviewIn30D) {
    //     return next(boom.conflict("You gave this organisation a review within the last 30 days"));
    //   }
    // }
    let dropDownListData;
    if (category === "agency") {
      dropDownListData = await getOrgsNamesByType("payroll");
    } else if (category === "payroll") {
      dropDownListData = await getOrgsNamesByType("agency");
    } else if (category === "worksite") {
      dropDownListData = await getOrgsNamesByType("company");
    }

    const getReviewAnswers = await getReviewDetails(orgId, userId);

    const groups = await getQuetionsByOrg(category);
    return res.json({
      groups,
      dropDownListData,
      getReviewAnswers,
      organization: { name, category },
    });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

const postReviewShort = async (req, res, next) => {
  const {
    review: {
      rate, overallReview, lastUse, voiceReview,
    },
  } = req.body.values;
  const { user, organization } = req.body;

  try {
    const organizationData = await getOrganization(organization.category, organization.name);
    const userData = await findByEmail(user.email);

    const newReview = new Review({
      rate,
      organization: organizationData,
      user: userData,
      overallReview: {
        text: overallReview,
      },
      lastUse,
      voiceReview: voiceReview || "voice/file", // temp until next sprint
    });
    await newReview.save();
    res.send(organizationData._id);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};

const postReview = async (req, res, next) => {
  const {
    answers: questionsAnswers,
    review: {
      rate, overallReview, lastUse, voiceReview,
    },
    comments,
  } = req.body.values;
  const { organization } = req.body;
  const { user } = req;

  if (!user) {
    next(boom.badImplementation("User is undefined"));
  }
  try {
    const organizationData = await getOrganization(organization.category, organization.name);
    const userData = await findByEmail(user.email);
    const questions = await getQuestionsByOrgCategory(organization.category);

    // TODO: refactor this code
    if (!organizationData || !userData || !questions) {
      next(boom.badImplementation("Bad data"));
    }
    const questionsObject = {};
    questions.forEach((q) => {
      if (!questionsObject[q.number]) {
        questionsObject[q.number] = q;
      }
    });

    const newReview = new Review({
      rate,
      organization: organizationData,
      user: userData,
      overallReview: {
        text: overallReview,
      },
      lastUse,
      voiceReview: {
        audio: voiceReview,
      },
    });

    const currentReview = await newReview.save();

    const commentsData = Object.keys(comments)
      .sort((a, b) => a - b)
      .map((c) => {
        if (comments[c]) {
          const comment = {
            user: userData,
            organization: organizationData,
            question: questionsObject[c],
            text: comments[c],
          };
          return comment;
        }
        return null;
      })
      .filter(value => value);

    const insertedComments = await Comment.insertMany(commentsData);
    const commentedQuestions = insertedComments.map(comment => ({
      id: comment.question.number,
      comment,
    }));

    const reviewAnswers = Object.keys(questionsAnswers)
      .sort((a, b) => a - b)
      .map((qAnswer) => {
        if (questionsAnswers[qAnswer] || questionsAnswers[qAnswer] === 0) {
          const answer = {
            user: userData,
            review: currentReview,
            question: questionsObject[qAnswer],
            answer: questionsAnswers[qAnswer],
            organization: organizationData,
          };
          commentedQuestions.forEach((item) => {
            // eslint-disable-next-line eqeqeq
            if (item.id == qAnswer) {
              answer.comment = item.comment;
            }
          });

          return answer;
        }
        return null;
      });

    const allAnswers = [...reviewAnswers].filter(answer => answer !== null);
    await Answer.insertMany(allAnswers);

    res.send(organizationData._id);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};

const updateReview = async (req, res, next) => {
  const {
    answers: questionsAnswers,
    review: {
      rate, overallReview, lastUse, voiceReview,
    },
  } = req.body.values;
  const { user } = req;

  const { organization } = req.body;
  const { id: reviewId } = req.params;

  try {
    const questions = await getQuestionsByOrgCategory(organization.category);
    const organizationData = await getOrganization(organization.category, organization.name);
    const userData = await findByEmail(user.email);

    const questionsObject = {};
    questions.forEach((q) => {
      if (!questionsObject[q.number]) {
        questionsObject[q.number] = q;
      }
    });

    await findReviewByIdAndUpdate(reviewId, {
      rate, text: overallReview, lastUse, audio: voiceReview || "",
    });

    const reviewAnswers = Object.keys(questionsAnswers)
      .sort((a, b) => a - b)
      .map((qAnswer) => {
        if (questionsAnswers[qAnswer]) {
          const answer = {
            answer: questionsAnswers[qAnswer],
            question: questionsObject[qAnswer],
          };
          return answer;
        }
        return null;
      });

    const allAnswers = [...reviewAnswers].filter(answer => answer !== null);

    allAnswers.forEach(async (ans) => {
      await Answer.updateOne(
        {
          review: reviewId,
          question: ans.question._id,
          organization: organizationData._id,
          user: userData._id,
        },
        { answer: ans.answer },
        { upsert: true },
      );
    });
    res.send(organizationData._id);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};


const getOrgsByType = async (req, res, next) => {
  const { category } = req.body;
  try {
    const organization = await getOrgsNamesByType(category);
    const names = organization[0].category;
    res.send({ names });
  } catch (err) {
    next(boom.badImplementation(err));
  }
};

const getAgencesAndPayrollsNames = async (req, res, next) => {
  try {
    const agencyAndPayrolls = await getAgenciesAndPayrollsNames();
    res.send(agencyAndPayrolls);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};

module.exports = {
  getByOrg,
  postReview,
  getOrgsByType,
  getAgencesAndPayrollsNames,
  postReviewShort,
  updateReview,
};
