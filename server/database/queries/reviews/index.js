const mongoose = require("mongoose");
const Organization = require("./../../models/Organization");
const Answer = require("./../../models/Answer");
const Comment = require("./../../models/Comment")

module.exports.checkOrgExists = organizationID => Organization.findById(organizationID);

module.exports.overallReview = organizationID => new Promise((resolve, reject) => {
  Organization.aggregate([
    // get the specific organization
    {
      $match: { _id: mongoose.Types.ObjectId(organizationID) },
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
      $match: { organization: mongoose.Types.ObjectId(organizationID) },
    },
    // get the comments
    {
      $lookup: {
        from: "comments",
        localField: "comment",
        foreignField: "_id",
        as: "comment",
      },
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
    {
      $unwind: "$question",
    },
    // group by profile sections
    {
      $group: {
        _id: "$question.profileSection",
        questions: { $push: "$$ROOT" },
      },
    },
  ])
    .then(resolve)
    .catch(err => reject(err));
});

module.exports.allComments = (organizationID, questionID) => new Promise((resolve, reject) => {
  Comment.aggregate([
    {
      $match: { 
        $and: [{
          organization: mongoose.Types.ObjectId(organizationID) 
        },
        {
          question: mongoose.Types.ObjectId(questionID) 
        }]
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        userId: "$user.userId",
        organization: 1,
        text: 1,
      },
    },
  ]).then(resolve).catch(err => reject(err));
});
