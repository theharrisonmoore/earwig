const Review = require("../../models/Review");

module.exports = (awaitingReview) => {
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
      },
    },
  ];

  if (awaitingReview === true) {
    aggregationArray.unshift({
      $match: { isVerified: false },
    });
  }

  return Review.aggregate(aggregationArray);
};
