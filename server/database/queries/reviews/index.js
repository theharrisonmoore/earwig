const mongoose = require("mongoose");
const Organization = require("./../../models/Organization");
const Answer = require("./../../models/Answer");
const Review = require("./../../models/Review");
const Comment = require("./../../models/Comment");
const getAllReviews = require("./allReviews");
const getOverallReplies = require("./getOverallReplies");
const getReviewDetails = require("./getReviewDetails");

module.exports.checkOrgExists = organizationID => Organization.findById(organizationID);

module.exports.deleteReview = id => Review.deleteOne({ _id: id });

module.exports.findById = id => Review.findById(id);

module.exports.getOverallReplies = getOverallReplies;

module.exports.getAllReviews = getAllReviews;

module.exports.addCommentOnOverallReview = (id, data) => Review.findByIdAndUpdate(id, {
  $push: {
    "overallReview.replies": data,
  },
});

// used in admin panel to change isVerified status of review
module.exports.approveRejectReview = (id, bool) => Review.findOneAndUpdate({ _id: id }, { isVerified: bool }, { new: true });

// used in admin panel to delete an answer of a review
module.exports.deleteAnswer = id => Answer.deleteOne({ _id: id });

module.exports.deleteReviewAnswers = id => Answer.deleteMany({ review: id });

module.exports.getAllReviews = getAllReviews;

module.exports.getReviewDetails = getReviewDetails;

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
      $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true },
    },

    // {
    //   $project: {
    //     reviews: { $ifNull: ["$reviews", { user: "unspecified" }] },
    //     name: 1,
    //     category: 1,
    //     phoneNumber: 1,
    //     email: 1,
    //     websiteUrl: 1,
    //     location: 1,
    //     contractor: 1,
    //     lastViewed: 1,
    //   },
    // },
    {
      $lookup: {
        from: "users",
        localField: "reviews.user",
        foreignField: "_id",
        as: "reviews.user",
      },
    },
    {
      $unwind: { path: "$reviews.user", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        "reviews.user.email": 0,
        "reviews.user.isAdmin": 0,
        "reviews.user.password": 0,
        "reviews.user.trade": 0,
        "reviews.user.createdAt": 0,
        "reviews.user.updatedAt": 0,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        category: { $first: "$category" },
        phoneNumber: { $first: "$phoneNumber" },
        email: { $first: "$email" },
        websiteUrl: { $first: "$websiteURL" },
        location: { $first: "$location" },
        contractor: { $first: "$contractor" },
        lastViewed: { $first: "$lastViewed" },
        reviews: { $push: "$reviews" },
        totalReviews: { $first: "$totalReviews" },
        avgRatings: { $first: "$avgRatings" },
      },
    },
    {
      $project: {
        lastViewed: 0,
      },
    },
  ])
    .then((result) => {
      // console.log("RES!!!!!", result);
      resolve(result);
    })
    .catch(err => reject(err));
});

module.exports.basicReview = organizationID => new Promise((resolve, reject) => {
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
        websiteURL: 0,
        phoneNumber: 0,
        email: 0,
      },
    },
  ])
    .then((result) => {
      resolve(result);
    })
    .catch(err => reject(err));
});

module.exports.allAnswers = organizationID => new Promise((resolve, reject) => {
  Answer.aggregate([
    // get all answers related to that organization
    {
      $match: { organization: mongoose.Types.ObjectId(organizationID) },
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
        $and: [
          {
            organization: mongoose.Types.ObjectId(organizationID),
          },
          {
            question: mongoose.Types.ObjectId(questionID),
          },
        ],
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
        displayName: 1,
      },
    },
  ])
    .then((result) => {
      resolve(result);
    })
    .catch(err => reject(err));
});
