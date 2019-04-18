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

  const agency = await Organization.find({ name: "Aspire Recruitment" });

  const users = await User.find({ verified: true, isAdmin: false });

  const comments = await Comment.find();

  const reviews = await Review.find({ user: users[0], organization: agency });

  const answers = [
    {
      question: agencyQuestions[0],
      answer: "no",
      comment: comments[0],
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[2],
      answer: "Fully accurate",
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[3],
      answer: "yes",
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[4],
      answer: "no",
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[5],
      answer: "no",
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[6],
      answer: "no",
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[7],
      answer: "John Doe",
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[8],
      answer: 20,
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[9],
      answer: "yes",
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[17],
      answer: 10,
      user: users[0],
      review: reviews[0],
    },
    {
      question: agencyQuestions[18],
      answer: "yes",
      comment: comments[2],
      user: users[0],
      review: reviews[0],
    },

    /* ================ agency 2 ========================= */
    {
      question: agencyQuestions[0],
      answer: "no",
      comment: comments[0],
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[1],
      answer: "yes",
      comment: comments[0],
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[2],
      answer: "Fully accurate",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[3],
      answer: "yes",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[4],
      answer: "no",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[5],
      answer: "no",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[6],
      answer: "no",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[7],
      answer: "John Doe",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[8],
      answer: 20,
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[9],
      answer: "yes",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[10],
      answer: "Champion Contractors",
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[17],
      answer: 10,
      user: users[1],
      review: reviews[1],
    },
    {
      question: agencyQuestions[18],
      answer: "yes",
      comment: comments[2],
      user: users[1],
      review: reviews[1],
    },
    /* ================ payroll 1 ========================= */
    {
      question: payrollQuestions[0],
      answer: "yes",
      comment: comments[0],
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[1],
      answer: "yes",
      comment: comments[0],
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[2],
      answer: "Mostly accurate",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[3],
      answer: "yes",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[4],
      answer: "no",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[5],
      answer: "no",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[6],
      answer: "no",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[7],
      answer: "yes",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[8],
      answer: "yes",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[9],
      answer: "yes",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[10],
      answer: 20,
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[11],
      answer: "yes",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[12],
      answer: "Acrow Recruitment",
      user: users[0],
      review: reviews[2],
    },
    {
      question: payrollQuestions[13],
      answer: "yes",
      user: users[0],
      review: reviews[2],
    },

    /* ================ payroll 2 ========================= */
    {
      question: payrollQuestions[0],
      answer: "yes",
      comment: comments[0],
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[1],
      answer: "no",
      comment: comments[0],
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[2],
      answer: "Fully accurate",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[3],
      answer: "no",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[4],
      answer: "yes",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[5],
      answer: "yes",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[6],
      answer: "no",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[7],
      answer: "no",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[8],
      answer: "no",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[9],
      answer: "no",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[12],
      answer: "Adecco",
      user: users[1],
      review: reviews[3],
    },
    {
      question: payrollQuestions[13],
      answer: "no",
      user: users[1],
      review: reviews[3],
    },

    /* ================ worksite 1 ========================= */

    {
      question: worksiteQuestions[0],
      answer: "yes",
      comment: comments[0],
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[1],
      answer: "yes",
      comment: comments[0],
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[2],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[4],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[5],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[6],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[7],
      answer: "no",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[8],
      answer: "image/link",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[9],
      answer: "no",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[10],
      answer: "no",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[11],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[12],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[13],
      answer: "no",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[14],
      answer: "hot foot served",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[15],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },

    {
      question: worksiteQuestions[16],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[17],
      answer: "4Seasons",
      user: users[0],
      review: reviews[4],
    },
    {
      question: worksiteQuestions[18],
      answer: "yes",
      user: users[0],
      review: reviews[4],
    },

    /* ================ worksite 2 ========================= */

    {
      question: worksiteQuestions[0],
      answer: "no",
      comment: comments[0],
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[1],
      answer: "yes",
      comment: comments[0],
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[2],
      answer: "yes",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[4],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[5],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[6],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[7],
      answer: "yes",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[8],
      answer: "image/link",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[9],
      answer: "yes",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[10],
      answer: "yes",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[11],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[12],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[13],
      answer: "yes",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[14],
      answer: ["hot foot served", "vending machines", "microwave"],
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[15],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },

    {
      question: worksiteQuestions[16],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[17],
      answer: "Blue Cafee",
      user: users[1],
      review: reviews[5],
    },
    {
      question: worksiteQuestions[18],
      answer: "no",
      user: users[1],
      review: reviews[5],
    },


    /* ================ company 1 ========================= */

    {
      question: companyQuestions[0],
      answer: "yes",
      comment: comments[0],
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[1],
      answer: "yes",
      comment: comments[0],
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[2],
      answer: "yes",
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[3],
      answer: "yes",
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[4],
      answer: "yes",
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[5],
      answer: "yes",
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[6],
      answer: "John Rees",
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[7],
      answer: "yes",
      user: users[0],
      review: reviews[6],
    },
    {
      question: companyQuestions[8],
      answer: "yes",
      user: users[0],
      review: reviews[6],
    },
    /* ================ company 2 ========================= */

    {
      question: companyQuestions[0],
      answer: "no",
      comment: comments[0],
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[1],
      answer: "no",
      comment: comments[0],
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[2],
      answer: "no",
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[3],
      answer: "no",
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[4],
      answer: "no",
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[5],
      answer: "no",
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[6],
      answer: "John Rees",
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[7],
      answer: "no",
      user: users[1],
      review: reviews[7],
    },
    {
      question: companyQuestions[8],
      answer: "no",
      user: users[1],
      review: reviews[7],
    },
  ];

  return Answer.create(answers);
};
