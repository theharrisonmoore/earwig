const mongoose = require("mongoose");
const User = require("./../../models/User");
const Comment = require("./../../models/Comment");
const Answer = require("./../../models/Answer");
const Review = require("./../../models/Review");
const Trade = require("./../../models/Trade");
const Helpfulness = require("./../../models/Helpfulness");
const Organization = require("./../../models/Organization");

const updateUserHelpfulPoints = require("./updateUserHelpfulPoints");
const getAllUsers = require("./allUsers");

const checkValidReferral = id =>
  // COMMENTED_VERIFICATION_CHECK
  // User.findOne({ _id: id, verified: true }, { password: 0 });
  User.findOne(
    { _id: id },
    { password: 0 },
  );

const updateUserById = (userId, data) => User.findByIdAndUpdate(
  userId,
  { $set: data },
  // return the updated document
  { new: true },
);

const deleteUserFields = (userId, data) => User.findByIdAndUpdate(
  userId,
  { $unset: data },
  // return the updated document
  { new: true },
);

const findByEmail = email => User.findOne({ email: email.toLowerCase() });

const addNew = (userData, session) => User.create([userData], { session });

const deleteUser = id => User.deleteOne({ _id: id });

const getUserById = (id, withoutPassword) => (withoutPassword ? User.findById(id, { password: 0 }) : User.findById(id));

const deleteDataAddedByUser = async (userId) => {
  // delete the users' comments

  const deleteUserComment = Comment.deleteMany({
    user: userId,
  });
  // delete the users' answers
  const deleteUserAnsweres = Answer.deleteMany({
    user: userId,
  });
  // delete the users' reviews
  const deleteUserReviews = Review.deleteMany({
    user: userId,
  });

  await deleteUserAnsweres;
  await deleteUserComment;
  await deleteUserReviews;
};

const deleteUserCompletely = async (userId) => {
  await deleteDataAddedByUser(userId);
  // delete the user
  return User.findByIdAndDelete(userId);
};

const deleteDataAndProfilesAddedByUser = async (userId) => {
  const deleteUserProfiles = Organization.deleteMany({
    createdBy: userId,
  });

  await deleteDataAddedByUser(userId);
  await deleteUserProfiles;
};

const deleteUserCompletelyWithProfiles = async (userId) => {
  await deleteDataAndProfilesAddedByUser(userId);
  // delete the user
  return User.findByIdAndDelete(userId);
};

const latestReviews = userId => new Promise((resolve, reject) => {
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

const findUserByToken = token => User.findOne({
  "resetToken.value": token,
  "resetToken.expiresIn": { $gt: Date.now() },
});

const getUserByUsername = username => User.findOne({ userId: username });

const getUsersTrade = tradeId => Trade.findById(tradeId);

const getUserVotesOnProfile = ({ userId, orgId }) => Helpfulness.find(
  { helpedUser: userId, organization: orgId, fromReferral: false },
  {
    points: 1,
    review: 1,
    target: 1,
    comment: 1,
  },
);

const getSignedUpReferrals = userId => User.find({ referral: userId }).count();

module.exports = {
  updateUserHelpfulPoints,
  checkValidReferral,
  updateUserById,
  deleteUserFields,
  findByEmail,
  addNew,
  deleteUser,
  getUserById,
  latestReviews,
  findUserByToken,
  getUserByUsername,
  getUsersTrade,
  getUserVotesOnProfile,
  deleteDataAndProfilesAddedByUser,
  deleteUserCompletelyWithProfiles,
  deleteUserCompletely,
  deleteDataAddedByUser,
  getAllUsers,
  getSignedUpReferrals,
};
