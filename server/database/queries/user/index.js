const mongoose = require("mongoose");
const User = require("./../../models/User");
const Comment = require("./../../models/Comment");
const Answer = require("./../../models/Answer");
const Review = require("./../../models/Review");

const getAllUsers = require("./allUsers");

module.exports.updateUserPoints = (userId, diffPoints) => User.findOneAndUpdate(
  { _id: userId },
  {
    $inc: { points: diffPoints },
  },
);

module.exports.updateUserById = (userId, data) => User.findByIdAndUpdate(userId, { $set: data });
module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.addNew = ({ email, password }) => User.create({
  email: email.toLowerCase(),
  password,
});

module.exports.getAllUsers = getAllUsers;

module.exports.deleteUser = id => User.deleteOne({ _id: id });

module.exports.getUserById = (id, withoutPassword) => (withoutPassword ? User.findById(id, { password: 0 }) : User.findById(id));

module.exports.deleteUserCompletely = async (userId) => {
  // delete the users' comments
  await Comment.deleteMany({
    user: userId,
  });
  // delete the users' answers
  await Answer.deleteMany({
    user: userId,
  });
  // delete the users' reviews
  await Review.deleteMany({
    user: userId,
  });
  // delete the user
  return User.findByIdAndDelete(userId);
};

module.exports.latestReviews = userId => new Promise((resolve, reject) => {
  Review.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userId) },
    },
    {
      $unwind: "$organization",
    },
    {
      $lookup: {
        from: "organizations",
        localField: "organization",
        foreignField: "_id",
        as: "organization",
      },
    },
    {
      $project: {
        createdAt: 1,
        "organization._id": 1,
        "organization.name": 1,
        "organization.category": 1,
      },
    },
  ])
    .then(resolve)
    .catch(err => reject(err));
});

// calculates helped points for a user

// get user's reviews, project votes and count those

module.exports.getHelpedPoints = async (userID) => {
  // matches userID in user table as referral and returns length
  const referralPoints = User.aggregate([
    {
      $match: { referral: mongoose.Types.ObjectId(userID) },
    },

    {
      $count: "refPoints",
    },
  ]);
  // counts all votes for user's reviews (text and voice) and adds times where user's ref code was used by other users

  const votingPoints = await Review.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userID) },
    },
    {
      $project: {
        _id: 0,
        overAll: "$overallReview.votes",
        voice: "$voiceReview.votes",
      },
    },
    {
      $unwind: "$overAll",
    },
    {
      $unwind: "$voice",
    },
  ]);

  let counter = 0;

  const userRefPoints = await referralPoints;
  if (referralPoints.refPoints) {
    counter += userRefPoints[0].refPoints;
  }

  await votingPoints.map((e) => {
    if (e.overAll) {
      e.overAll = 1;
      counter += e.overAll;
    }
    if (e.voice) {
      e.voice = 1;
      counter += e.voice;
    }

    return counter;
  });

  return counter;
};
