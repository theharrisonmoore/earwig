const mongoose = require("mongoose");
const Organization = require("./../../models/Organization");
const Answer = require("./../../models/Answer");
const Review = require("./../../models/Review");
const Comment = require("./../../models/Comment");
const Question = require("./../../models/Question");

const getAllReviews = require("./allReviews");
const getOverallReplies = require("./getOverallReplies");
const getReviewDetails = require("./getReviewDetails");
const updateOverallHelpfullPoints = require("./updateOverallHelpfullPoints");

const { getHelpedPoints } = require("../user/index");

module.exports.updateOverallHelpfullPoints = updateOverallHelpfullPoints;

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
      $lookup: {
        from: "trades",
        localField: "reviews.user.trade",
        foreignField: "_id",
        as: "reviews.user.trade",
      },
    },

    {
      $project: {
        "reviews.user.email": 0,
        "reviews.user.isAdmin": 0,
        "reviews.user.password": 0,
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
    .then(result => resolve(result))
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
    {
      $sort: {
        "question.profileOrder": 1,
      },
    },
    // group by profile sections
    {
      $group: {
        _id: "$question.profileSection",
        questions: { $push: "$$ROOT" },
      },
    },
    // {
    //   $sort: {
    //     "_id": 1,
    //   },
    // },
  ])
    .then(resolve)
    .catch(err => reject(err));
});

module.exports.allQsAndAs = (orgType, orgId, justContractor) => new Promise((resolve, reject) => {
  let match = {
    $match: { category: orgType },
  };

  if (orgType === "worksite" && justContractor) {
    match = {
      $match: { category: orgType, text: "Who is the main contractor on site?" },
    };
  }

  Question.aggregate([
    // get all the questions for that organization type
    match,
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "question",
        as: "answers",
      },
    },
    {
      $project: {
        _id: 1,
        category: 1,
        type: 1,
        profileSection: 1,
        profileText: 1,
        profileType: 1,
        profileOrder: 1,
        group: 1,
        hasComment: 1,
        icon: 1,
        text: 1,
        options: 1,
        answers: {
          $filter: {
            input: "$answers",
            as: "answer",
            cond: { $eq: ["$$answer.organization", mongoose.Types.ObjectId(orgId)] },
          },
        },
      },
    },
    {
      $sort: {
        profileOrder: 1,
      },
    },
    // group by profile sections
    {
      $group: {
        _id: "$profileSection",
        questions: { $push: "$$ROOT" },
      },
    },
  ]).then(resolve).catch(err => reject(err));
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

// gets all reviews given by 1 user for 1 organisation and sets a flag depending
// returns true if review is less than 1 month old

module.exports.checkUsersLatestReview = (organization, user) => new Promise((resolve, reject) => {
  Review.aggregate([
    // get all reviews for 1 user
    {
      $match: {
        $and: [
          {
            organization: mongoose.Types.ObjectId(organization),
          },
          {
            user: mongoose.Types.ObjectId(user),
          },
        ],
      },
    },

    {
      $project: {
        _id: 0,
        date: "$createdAt",
        // get number of days between creation of review and today
        // first step mil seconds, second step days
        diff_days: {
          $divide: [
            {
              $subtract: [new Date(), "$createdAt"],
            },
            1000 * 60 * 60 * 24,
          ],
        },
        older_30_days: {
          $lte: [30, "$diff_days"],
        },
      },
    },
  ])
    .then(result => resolve(result))
    .catch(err => reject(err));
});
