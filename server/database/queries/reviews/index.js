const Organization = require("./../../models/Organization");

module.exports.overallReview = organizationID => new Promise((resolve, reject) => {
  Organization.aggregate([
    {
      $match: { _id: organizationID },
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
        lastViewed: 0,
      },
    },
  ])
    .then(resolve)
    .catch(err => reject(err));
});

// get all the reviews that match an organisation id
// get all the answers for that review and store in an answers field

module.exports.allAnswers = organizationID => new Promise((resolve, reject) => {
  Organization.aggregate([
    {
      $match: { organization: organizationID },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "organization",
        as: "answers",
      },
    },
  ])
    .then(resolve)
    .catch(err => reject(err));
});
