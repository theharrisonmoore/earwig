const Organization = require("../models/Organization");
// const Reviews = require("../models/Review");

module.exports = searchInput => new Promise((resolve, reject) => {
  Organization.aggregate([
    {
      $match: {
        name: searchInput,
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "organization",
        as: "reviews",
      },
    },
    {
      $addFields: {
        totalReviews: {
          $size: "$reviews",
        },
        avgRatings: {
          $avg: "$reviews.rate",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        category: 1,
        totalReviews: 1,
        avgRatings: 1,
      },
    },
  ])
    .then(resolve)
    .catch(reject);
});
