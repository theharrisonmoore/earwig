const boom = require("boom");

const {
  getQuetionsByOrg,
  getOrganizationById,
  getOrganization,
  getQuestionsByOrgCategory,
  postOrg,
  getOrgsNamesByType,
  getAgenciesAndPayrollsNames,
  getReviewDetails,
  findReviewById,
  findReviewByIdAndUpdate,
} = require("../database/queries/review");
const { findByEmail } = require("../database/queries/user");

const Review = require("../database/models/Review");
const Answer = require("../database/models/Answer");
const Comment = require("../database/models/Comment");

const getByOrg = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: orgId } = req.params;

  const { category, name } = await getOrganizationById(orgId);

  try {
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
    res.json({
      groups,
      dropDownListData,
      getReviewAnswers,
      organization: { name, category },
    });
  } catch (err) {
    next(boom.badImplementation());
  }
};

const postReviewShort = async (req, res, next) => {
  const {
    review: {
      rate, overallReview, workPeriod, voiceReview,
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
      workPeriod,
      voiceReview: voiceReview || "voice/file", // temp until next sprint
    });
    await newReview.save();
    res.send(organizationData._id);
  } catch (error) {
    next(boom.badImplementation());
  }
};

const postReview = async (req, res, next) => {
  const {
    answers: questionsAnswers,
    review: {
      rate, overallReview, workPeriod, voiceReview,
    },
    comments,
  } = req.body.values;
  const { organization } = req.body;
  const { user } = req;

  console.log("REQ", req.body);
  console.log("voice", voiceReview)

  try {
    const organizationData = await getOrganization(organization.category, organization.name);
    const userData = await findByEmail(user.email);
    const questions = await getQuestionsByOrgCategory(organization.category);

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
      workPeriod,
      voiceReview: {
        audio: voiceReview,
      },
    });

    console.log("new", newReview)

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
        if (questionsAnswers[qAnswer]) {
          const answer = {
            user: userData,
            review: currentReview,
            question: questionsObject[qAnswer],
            answer: questionsAnswers[qAnswer],
            organization: organizationData,
          };
          commentedQuestions.map((item) => {
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
  } catch (error) {
    next(boom.badImplementation());
  }
};

const updateReview = async (req, res, next) => {
  const {
    answers: questionsAnswers,
    review: { rate, overallReview, workPeriod },
  } = req.body.values;
  const { organization } = req.body;
  const { id: reviewId } = req.params;

  try {
    const questions = await getQuestionsByOrgCategory(organization.category);

    const questionsObject = {};
    questions.forEach((q) => {
      if (!questionsObject[q.number]) {
        questionsObject[q.number] = q;
      }
    });

    await findReviewByIdAndUpdate(reviewId, { rate, text: overallReview, workPeriod });

    const reviewAnswers = Object.keys(questionsAnswers)
      .sort((a, b) => a - b)
      .map((qAnswer) => {
        if (questionsAnswers[qAnswer]) {
          const answer = {
            question: questionsObject[qAnswer]._id,
            answer: questionsAnswers[qAnswer],
          };
          return answer;
        }
        return null;
      });

    const allAnswers = [...reviewAnswers].filter(answer => answer !== null);

    allAnswers.forEach(async (ans) => {
      await Answer.updateOne(
        { review: reviewId, question: ans.question },
        { answer: ans.answer },
        { upsert: true },
      );
    });
    res.send();
  } catch (err) {
    next(boom.badImplementation());
  }
};

/* not used now */
const addNewOrg = async (req, res, next) => {
  const { name, category } = req.body;
  try {
    await postOrg(category, name);
    res.send();
  } catch (err) {
    next(boom.badImplementation());
  }
};

const getOrgsByType = async (req, res, next) => {
  const { category } = req.body;
  try {
    const organization = await getOrgsNamesByType(category);
    const names = organization[0].category;
    res.send({ names });
  } catch (err) {
    next(boom.badImplementation());
  }
};

const getAgencesAndPayrollsNames = async (req, res, next) => {
  try {
    const agencyAndPayrolls = await getAgenciesAndPayrollsNames();
    res.send(agencyAndPayrolls);
  } catch (err) {
    next(boom.badImplementation());
  }
};

module.exports = {
  getByOrg,
  postReview,
  addNewOrg,
  getOrgsByType,
  getAgencesAndPayrollsNames,
  postReviewShort,
  updateReview,
};
