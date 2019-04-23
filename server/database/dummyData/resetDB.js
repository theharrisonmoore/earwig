const User = require("./../models/User");
const Answer = require("./../models/Answer");
const Trade = require("./../models/Trade");
const Comment = require("./../models/Comment");
const Job = require("./../models/Job");
const Organization = require("./../models/Organization");
const Question = require("./../models/Question");
const Review = require("./../models/Review");
const MailList = require("./../models/MailList");


const resetDB = async () => {
  await User.deleteMany();
  await Answer.deleteMany();
  await Trade.deleteMany();
  await Comment.deleteMany();
  await Job.deleteMany();
  await Organization.deleteMany();
  await Question.deleteMany();
  await MailList.deleteMany();
  return Review.deleteMany();
};

module.exports = resetDB;
