const Question = require("../models/Question");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Review = require("../models/Review");

module.exports = async () => {
  const agencyQuestions = await Question.find({ orgType: "agency" });
  const payrollQuestions = await Question.find({ orgType: "payroll" });
  const companyQuestions = await Question.find({ orgType: "company" });
  const worksiteQuestions = await Question.find({ orgType: "worksite" });

  const agencies = await Organization.find({ type: "agency" });
  const companies = await Organization.find({ type: "company" });
  const payrolls = await Organization.find({ type: "payroll" });
  const worksites = await Organization.find({ type: "worksite" });

  const comments = await Comment.find({ user: users[0], organization: agencies[0] });

  const reviews = await Review.find({ user: user[0], organization: agencies[0] });

  const users = await User.find({ verified: true, isAdmin: false });

  const answers = [
    {
      question: agencyQuestions[0],
      answer: "no",
      comment: comments.filter(comment => comment.question === agencyQuestions[0].id)[0],
      user: users[0],
      review: review[0],
    },
  ];
};
