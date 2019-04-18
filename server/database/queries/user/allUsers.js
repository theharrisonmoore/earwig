const User = require("../../models/User");

module.exports = () => User.aggregate([
  {
    $match: {
      isAdmin: false,
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
      key: "$_id",
    },
  },
]);
