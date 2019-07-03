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
      reviewDate: "$reviewDetails.createdAt",
      rating: "$reviewDetails.rate",
      overallReview: "$reviewDetails.overallReview.text",
      userId: "$user.userId",
      uniqueUserId: "$user._id",
      city: "$user.city",
      points: "$user.points",
      peopleHelped: "$user.helpedPoints",
      givenReviews: { $size: "$user.givenReviews" },
      trade: { $arrayElemAt: ["$user.trade.title", 0] },
      entityType: "$organization.category",
      entityName: "$organization.name",
      workedFrom: "$reviewDetails.workPeriod.from",
      workedTo: "$reviewDetails.workPeriod.to",
      "answers._id": 1,
      "answers.answer": 1,
      "answers.comment": 1,
      "answers.question.text": 1,
      myReviews: 1,
    },
  },
]);
