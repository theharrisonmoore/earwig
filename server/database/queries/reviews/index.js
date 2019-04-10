const Organization = require("./../../models/Organization");
const Answer = require("./../../models/Answer");

module.exports.overallReview = organizationID => new Promise((resolve, reject) => {
  Organization.aggregate([
    // get the specific organization
    {
      $match: { _id: organizationID },
    },
    // get all the reviews that organization has
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
        // store the total number of reviews
        totalReviews: {
          $size: "$reviews",
        },
        // work out the organization's average rating
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
  Answer.aggregate([
    // get all answers related to that organization
    {
      $match: { organization: organizationID },
    },
    // group the answers by the question
    // each question now has an array of the answers
    {
      $group: {
        _id: "$question",
        answers: { $push: "$$ROOT" },
      },
    },
    // add the question info to each question (e.g. type of question)
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "_id",
        as: "question",
      },
    },
  ])
    .then(resolve)
    .catch(err => reject(err));
});
