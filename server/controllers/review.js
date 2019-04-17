const boom = require("boom");

const {
  getQuetionsByOrg, getOrganization, getQuestionsByOrgCategory,
  postOrg, getOrgsNamesByType,
  getAgenciesAndPayrollsNames,
} = require("../database/queries/review");
const { findByEmail } = require("../database/queries/user");

const Review = require("../database/models/Review");
const Answer = require("../database/models/Answer");

const getByOrg = (req, res, next) => {
  const { organization } = req.query;

  getQuetionsByOrg(organization)
    .then((groups) => {
      res.json(groups);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};

const postReview = async (req, res, next) => {
  const {
    questions: questionsAnswers,
    review: {
      rate, overallReview, workPeriod, voiceReview,
    },
    checklist,
    worksiteImage,
  } = req.body.values;
  const { user, organization } = req.body;
  try {
    const organizationData = await getOrganization(organization.category, organization.name);
    const userData = await findByEmail(user.email);
    const questions = await getQuestionsByOrgCategory(organization.category);

    const newReview = new Review({
      rate,
      organization: organizationData,
      user: userData,
      overallReview: {
        text: overallReview,
      },
      workPeriod: workPeriod || {
        from: "2019-01-01", // temp until we agree on a datepicker
        to: "2019-03-31",
      },
      voiceReview: voiceReview || "voice/file", // temp until we agree on a datepicker
    });

    const currentReview = await newReview.save();

    const reviewAnswers = Object.keys(questionsAnswers).sort((a, b) => a - b).map((qAnswer) => {
      const answer = {
        user: userData,
        review: currentReview,
        question: questions[qAnswer],
        answer: questionsAnswers[qAnswer],
      };
      return answer;
    });

    let allAnswers = reviewAnswers;

    if (organization.category === "worksite") {
      const checklistQuestin = questions.filter(q => q.type === "checklist");
      const image = questions.filter(q => q.type === "image");
      if (checklistQuestin && checklistQuestin[0] && checklistQuestin[0].text) {
        const checklistAnswer = {
          user: userData,
          review: currentReview,
          question: checklistQuestin[0],
          answer: checklist,
        };
        allAnswers = [...reviewAnswers, checklistAnswer];
      }
      if (image && image[0] && image[0].text) {
        const imageAnswer = {
          user: userData,
          review: currentReview,
          question: image[0],
          answer: worksiteImage,
        };
        allAnswers = [...reviewAnswers, imageAnswer];
      }
    }

    await Answer.insertMany(allAnswers);

    res.send();
  } catch (error) {
    next(boom.badImplementation);
  }
};

const addNewAgencyPayroll = async (req, res, next) => {
  const { name, category } = req.body;
  await postOrg(category, name);
  console.log("hi", req.body);
  res.send();
};

const getOrgsByType = async (req, res, next) => {
  const { category } = req.body;
  try {
    const organization = await getOrgsNamesByType(category);
    const names = organization[0].category;
    res.send({ names });
  } catch (err) {
    console.log("database query error", err);
    boom.badImplementation();
  }
};

const getAgencesAndPayrollsNames = async (req, res, next) => {
  try {
    const agencyAndPayrolls = await getAgenciesAndPayrollsNames();
    console.log("dkjfdkf", agencyAndPayrolls);
    res.send(agencyAndPayrolls);
  } catch (err) {
    console.log("database query error", err);
    boom.badImplementation();
  }
};

module.exports = {
  getByOrg, postReview, addNewAgencyPayroll, getOrgsByType, getAgencesAndPayrollsNames,
};
