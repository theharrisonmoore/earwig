const User = require("../../models/User");

module.exports = (awaitingReview) => {
  const match = {
    isAdmin: false,
  };

  if (awaitingReview === true) {
    match.awaitingReview = true;
  }

  return User.aggregate([
    {
      $match: match,
    }, {
      $lookup: {
        from: "trades",
        localField: "trade",
        foreignField: "_id",
        as: "trade",
      },
    }, {
      $project: {
        status: {
          $cond: {
            if: { $eq: [true, "$verified"] },
            then: "verified",
            else: {
              $cond: {
                if: { $eq: [true, "$awaitingReview"] },
                then: "awaiting review",
                else: "unverified",
              },
            },
          },
        },
        email: 1,
        userId: 1,
        city: { $ifNull: ["$city", "N/A"] },
        key: "$_id",
        trade: { $arrayElemAt: ["$trade", 0] },
      },
    }, {
      $addFields: {
        trade: { $ifNull: ["$trade.title", "N/A"] },
      },
    },
  ]);
};
