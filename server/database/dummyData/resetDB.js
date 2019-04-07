const User = require("./../models/User");
const Answer = require("./../models/Answer");
const Trade = require("./../models/Trade");
const Comment = require("./../models/Comment");
const Job = require("./../models/Job");
const Organization = require("./../models/Organization");
const Question = require("./../models/Question");
const Review = require("./../models/Review");


const resetDB = async () => {
  await User.deleteMany();
  await Answer.deleteMany();
  await Trade.deleteMany();
  await Comment.deleteMany();
  await Job.deleteMany();
  await Organization.deleteMany();
  await Question.deleteMany();
  return Review.deleteMany();
};

module.exports = resetDB;
