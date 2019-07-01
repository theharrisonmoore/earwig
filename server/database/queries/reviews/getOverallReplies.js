const mongoose = require("mongoose");

const Review = require("../../models/Review");

module.exports = id => Review.aggregate([
  {
    $match: {
      _id: mongoose.Types.ObjectId(id),
    },
  },
  {
    $project: {
      replies: "$overallReview.replies",
    },
  },
  {
    $unwind: { path: "$replies" },
  },
  {
    $lookup: {
      from: "users",
      localField: "replies.user",
      foreignField: "_id",
      as: "replies.user",
    },
  },
  {
    $unwind: { path: "$replies.user", preserveNullAndEmptyArrays: true },
  },
  {
    $lookup: {
      from: "trades",
      localField: "replies.user.trade",
      foreignField: "_id",
      as: "replies.user.trade",
    },
  },
  {
    $project: {
      "replies.user.password": 0,
      "replies.user.awaitingReview": 0,
      "replies.user.email": 0,
      "replies.user.updatedAt": 0,
      "replies.user.createdAt": 0,
    },
  },
]);
