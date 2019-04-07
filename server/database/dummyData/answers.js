const Question = require("../models/Question");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Review = require("../models/Review");
const Answer = require("../models/Answer");

module.exports = async () => {
  const agencyQuestions = await Question.find({ category: "agency" }).sort({ number: 1 });
  const payrollQuestions = await Question.find({ category: "payroll" }).sort({ number: -1 });
  const companyQuestions = await Question.find({ category: "company" }).sort({ number: -1 });
  const worksiteQuestions = await Question.find({ category: "worksite" }).sort({ number: -1 });

  const agencies = await Organization.find({ category: "agency" });
  const companies = await Organization.find({ category: "company" });
  const payrolls = await Organization.find({ category: "payroll" });
  const worksites = await Organization.find({ category: "worksite" });

  const users = await User.find({ verified: true, isAdmin: false });

  const comments = await Comment.find({ user: users[0], organization: agencies[0] });

  const reviews = await Review.find({ user: users[0], organization: agencies[0] });

  const answers = [
    {
      question: agencyQuestions[0],
      answer: "no",
      comment: comments.filter(comment => comment.question === agencyQuestions[0].id)[0],
      user: users[0],
      review: reviews[0],
    },
  ];

  return Answer.create(answers);
};
