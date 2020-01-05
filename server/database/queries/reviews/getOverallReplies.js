const mongoose = require("mongoose");

const Review = require("../../models/Review");

module.exports = (id, target, userId) => {
  let match = { "replies.user.verified": true };

  if (userId) {
    match = {
      $or: [
        { "replies.user.verified": true },
        { "replies.user._id": mongoose.Types.ObjectId(userId) },
      ],
    };
  }

  return Review.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        replies: `$${target}.replies`,
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
      $match: match,

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
    { $replaceRoot: { newRoot: "$replies" } },
    {
      $project: {
        "user.password": 0,
        "user.awaitingReview": 0,
        "user.email": 0,
        "user.updatedAt": 0,
        "user.createdAt": 0,
      },
    },
  ]);
};
