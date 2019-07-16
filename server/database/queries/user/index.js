const mongoose = require("mongoose");
const User = require("./../../models/User");
const Comment = require("./../../models/Comment");
const Answer = require("./../../models/Answer");
const Review = require("./../../models/Review");
const Trade = require("./../../models/Trade");
const updateUserHelpfulPoints = require("./updateUserHelpfulPoints");
const getAllUsers = require("./allUsers");

module.exports.updateUserPoints = (userId, diffPoints) => User.findOneAndUpdate(
  { _id: userId },
  {
    $inc: {
      points: diffPoints,
      helpedUsers: 1,
    },
  },
);


module.exports.checkValidReferral = id => User.findOne(
  { _id: id, verified: true }, { password: 0 },
);

module.exports.updateUserById = (userId, data) => User.findByIdAndUpdate(
  userId,
  { $set: data },
  // return the updated document
  { new: true },
);

module.exports.deleteUserFields = (userId, data) => User.findByIdAndUpdate(
  userId,
  { $unset: data },
  // return the updated document
  { new: true },
);


module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.addNew = userData => User.create(userData);

module.exports.getAllUsers = getAllUsers;

module.exports.deleteUser = id => User.deleteOne({ _id: id });

module.exports.getUserById = (id, withoutPassword) => (
  withoutPassword
    ? User.findById(id, { password: 0 })
    : User.findById(id)
);

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

module.exports.findUserByToken = token => User.findOne({
  "resetToken.value": token,
  "resetToken.expiresIn": { $gt: Date.now() },
});

module.exports.getUserByUsername = username => User.findOne({ userId: username });

module.exports.getUsersTrade = tradeId => Trade.findById(tradeId);

module.exports.updateUserHelpfulPoints = updateUserHelpfulPoints;
