const Question = require("../models/Question");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Review = require("../models/Review");
const Answer = require("../models/Answer");

module.exports = async () => {
  const agencyQuestions = await Question.find({ category: "agency" }).sort({ number: 1 });
  const payrollQuestions = await Question.find({ category: "payroll" }).sort({ number: 1 });
  const worksiteQuestions = await Question.find({ category: "worksite" }).sort({ number: 1 });
  const companyQuestions = await Question.find({ category: "company" }).sort({ number: 1 });

  // const agency = await Organization.find({ name: "Aspire Recruitment" });

  const companies = await Organization.find({ category: "company" });
  const agencies = await Organization.find({ category: "agency" });
  const worksites = await Organization.find({ category: "worksite" });
  const payrolls = await Organization.find({ category: "payroll" });

  const users = await User.find({ verified: true, isAdmin: false });

  const comments = await Comment.find();

  const agencyReview1 = await Review.find({ user: users[0], organization: agencies[0] });
  const agencyReview2 = await Review.find({ user: users[1], organization: agencies[0] });
  const payrollReview1 = await Review.find({ user: users[0], organization: payrolls[0] });
  const payrollReview2 = await Review.find({ user: users[1], organization: payrolls[0] });
  const worksiteReview1 = await Review.find({ user: users[0], organization: worksites[0] });
  const worksiteReview2 = await Review.find({ user: users[1], organization: worksites[0] });
  const companyReview1 = await Review.find({ user: users[0], organization: companies[0] });
  const companyReview2 = await Review.find({ user: users[1], organization: companies[0] });

  const reviews = [
    agencyReview1[0],
    agencyReview2[0],
    payrollReview1[0],
    payrollReview2[0],
    worksiteReview1[0],
    worksiteReview2[0],
    companyReview1[0],
    companyReview2[0],
  ];

  const answers = [
    {
      question: agencyQuestions[0],
      answer: "No",
      comment: comments[0],
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[2],
      answer: "Fully accurate",
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[3],
      answer: "Yes",
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[4],
      answer: "No",
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[5],
      answer: "No",
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[6],
      answer: "No",
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[7],
      answer: 20,
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[8],
      answer: "Yes",
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[14],
      answer: payrolls[0].name,
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },
    {
      question: agencyQuestions[15],
      answer: 10,
      user: users[0],
      review: reviews[0],
      organization: reviews[0].organization,
    },

    /* ================ agency 2 ========================= */
    {
      question: agencyQuestions[0],
      answer: "Yes",
      comment: comments[1],
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[1],
      answer: "Yes",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[2],
      answer: "Fully accurate",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[3],
      answer: "Yes",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[4],
      answer: "No",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[5],
      answer: "No",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[6],
      answer: "No",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[7],
      answer: 20,
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[8],
      answer: "No",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[9],
      answer: "CIS",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[10],
      answer: "Yes",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[11],
      answer: "Yes",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[12],
      answer: "Yes",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    {
      question: agencyQuestions[13],
      answer: "Yes",
      user: users[1],
      review: reviews[1],
      organization: reviews[1].organization,
    },
    /* ================ payroll 1 ========================= */
    {
      question: payrollQuestions[0],
      answer: "Yes",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[1],
      answer: "Yes",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[2],
      answer: 10,
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[3],
      answer: "CIS",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[4],
      answer: "No",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[5],
      answer: "No",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[6],
      answer: "No",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[7],
      answer: "Yes",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[8],
      answer: 20,
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[9],
      answer: "Yes",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },
    {
      question: payrollQuestions[10],
      answer: "Acrow Recruitment",
      user: users[0],
      review: reviews[2],
      organization: reviews[2].organization,
    },

    /* ================ payroll 2 ========================= */
    {
      question: payrollQuestions[0],
      answer: "Yes",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[1],
      answer: "No",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[2],
      answer: 10,
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[3],
      answer: "Ltd",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[4],
      answer: "Yes",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[5],
      answer: "Yes",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[6],
      answer: "No",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[7],
      answer: "No",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[8],
      answer: 0,
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[9],
      answer: "No",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },
    {
      question: payrollQuestions[10],
      answer: "Adecco",
      user: users[1],
      review: reviews[3],
      organization: reviews[3].organization,
    },

    /* ================ worksite 1 ========================= */

    {
      question: worksiteQuestions[0],
      answer: "No",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[1],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[2],
      answer: 0,
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[3],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[4],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[5],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[6],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[7],
      answer: "ww_1215_worksite1-1556598904800.jpg",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[8],
      answer: "No",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[9],
      answer: "No",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[10],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[11],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[12],
      answer: "No",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[13],
      answer: ["Hot food served"],
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[14],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },

    {
      question: worksiteQuestions[15],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[16],
      answer: "4Seasons",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },
    {
      question: worksiteQuestions[17],
      answer: "Yes",
      user: users[0],
      review: reviews[4],
      organization: reviews[4].organization,
    },

    /* ================ worksite 2 ========================= */

    {
      question: worksiteQuestions[0],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[1],
      answer: "Yes",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[2],
      answer: 0,
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[3],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[4],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[5],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[6],
      answer: "Yes",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[7],
      answer: "ww_1215_worksite1-1556598904800.jpg",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[8],
      answer: "Yes",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[9],
      answer: "Yes",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[10],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[11],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[12],
      answer: "Yes",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[13],
      answer: ["Hot food served", "Vending machines", "Microwave"],
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[14],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },

    {
      question: worksiteQuestions[15],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[16],
      answer: "Blue Cafee",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },
    {
      question: worksiteQuestions[17],
      answer: "No",
      user: users[1],
      review: reviews[5],
      organization: reviews[5].organization,
    },

    /* ================ company 1 ========================= */

    {
      question: companyQuestions[0],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[1],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[2],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[3],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[4],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[5],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[6],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[7],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    {
      question: companyQuestions[8],
      answer: "Yes",
      user: users[0],
      review: reviews[6],
      organization: reviews[6].organization,
    },
    /* ================ company 2 ========================= */

    {
      question: companyQuestions[0],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[1],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[2],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[3],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[4],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[5],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[6],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[7],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
    {
      question: companyQuestions[8],
      answer: "No",
      user: users[1],
      review: reviews[7],
      organization: reviews[7].organization,
    },
  ];

  return Answer.create(answers);
};
