const mongoose = require("mongoose");
const Review = require("../../models/Review");

module.exports = ({ awaitingReview, organisation }) => {
  const aggregationArray = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
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
        user: {
          $arrayElemAt: ["$user", 0],
        },
        organization: {
          $arrayElemAt: ["$organization", 0],
        },
        isVerified: 1,
        rate: 1,
        overallReview: 1,
        date: "$createdAt",
      },
    },
    {
      $addFields: {
        organization: "$organization.name",
        orgType: "$organization.category",
        userId: "$user.userId",
        email: "$user.email",
        orgId: "$organization._id",
        key: "$_id",
      },
    },
  ];

  if (awaitingReview === true) {
    aggregationArray.unshift({
      $match: { isVerified: false },
    });
  } else if (organisation) {
    aggregationArray.unshift({
      $match: { organization: mongoose.Types.ObjectId(organisation) },
    });
  }

  return Review.aggregate(aggregationArray);
};
