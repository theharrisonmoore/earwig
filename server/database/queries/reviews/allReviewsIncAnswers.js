const Answer = require("../../models/Answer");

module.exports = () => Answer.aggregate([
  {
    $lookup: {
      from: "questions",
      localField: "question",
      foreignField: "_id",
      as: "question",
    },
  },
  {
    $lookup: {
      from: "reviews",
      localField: "review",
      foreignField: "_id",
      as: "review",
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
    $lookup: {
      from: "organizations",
      localField: "organization",
      foreignField: "_id",
      as: "organization",
    },
  },
  {
    $unwind: "$review",
  },
  {
    $unwind: "$user",
  },
  {
    $unwind: "$organization",
  },
  {
    $unwind: "$question",
  },
  {
    $lookup: {
      from: "trades",
      localField: "user.trade",
      foreignField: "_id",
      as: "user.trade",
    },
  },
  {
    $lookup: {
      from: "reviews",
      localField: "user._id",
      foreignField: "user",
      as: "user.givenReviews",
    },
  },
  {
    $group: {
      _id: "$review._id",
      reviewDetails: { $first: "$review" },
      answers: { $push: "$$CURRENT" },
      user: { $first: "$user" },
      organization: { $first: "$organization" },
    },
  },
  {
    $project: {
      _id: 1,
      "Review date": "$reviewDetails.createdAt",
      "Overall star rating": "$reviewDetails.rate",
      "Overall Review": "$reviewDetails.overallReview.text",
      "earwig ID": "$user.userId",
      "Unique User ID": "$user._id",
      "Town or City": "$user.city",
      "Points earned": "$user.points",
      "People helped": "$user.helpedPoints",
      "Reviews given": { $size: "$user.givenReviews" },
      Trade: { $arrayElemAt: ["$user.trade.title", 0] },
      "Entity type": "$organization.category",
      "Entity name": "$organization.name",
      "Date from": "$reviewDetails.workPeriod.from",
      "Date to": "$reviewDetails.workPeriod.to",
      "answers._id": 1,
      "answers.answer": 1,
      "answers.comment": 1,
      "answers.question.text": 1,
      "answers.question.category": 1,
    },
  },
]);
