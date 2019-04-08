const Question = require("../models/Question");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Review = require("../models/Review");
const Answer = require("../models/Answer");

module.exports = async () => {
  const agencyQuestions = await Question.find({ category: "agency" }).sort({ number: 1 });

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
  ];

  return Answer.create(answers);
};
