const boom = require("boom");

const { getQuetionsByOrg, getOrganization, getQuestionsByOrgCategory } = require("../database/queries/review");
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
    hasAgreed,
    checklist,
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
        from: "2019-01-01",
        to: "2019-03-31",
      },
      voiceReview: voiceReview || "voice/file",
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
      const checklistAnswer = {
        user: userData,
        review: currentReview,
        question: checklistQuestin[0],
        answer: checklist,
      };
      allAnswers = [...reviewAnswers, checklistAnswer];
    }

    const insertedAnswers = await Answer.insertMany(allAnswers);

    console.log(insertedAnswers);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getByOrg, postReview };
