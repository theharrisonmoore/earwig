const Question = require("../models/Question");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Review = require("../models/Review");

module.exports = async () => {
  const agencyQuestions = await Question.find({ category: "agency" }).sort({ number: 1 });

  const agencies = await Organization.find({ category: "agency" });

  const users = await User.find({ verified: true, isAdmin: false });
  const review1 = await Review.findOne({ user: users[0] });
  const review2 = await Review.findOne({ user: users[1] });


  const comments = [
    {
      organization: agencies[0],
      question: agencyQuestions[0],
      user: users[0],
      text: "The contract was misleading and tricky",
      review: review1,
    },
    {
      organization: agencies[0],
      question: agencyQuestions[0],
      user: users[1],
      text: "This is a shity agency with a confusing contract. I wouldn't work with them again",
      review: review2,
    },
  ];
  return Comment.create(comments);
};
