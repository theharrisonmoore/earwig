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
        localField: "organization",
        foreignField: "_id",
        as: "reviews",
      },
    },
    // { $unwind: "$reviews" },
    {
      $project: {
        reviews: 1,
      },
    },
  ])
    .then(resolve)
    .catch(reject);
});
