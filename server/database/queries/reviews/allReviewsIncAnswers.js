const Review = require("../../models/Review");

module.exports = () => Review.aggregate([
  {
    $lookup: {
      from: "answers",
      let: { reviewId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$review", "$$reviewId"],
            },
          },
        },
        {
          $lookup: {
            from: "questions",
            localField: "question",
            foreignField: "_id",
            as: "question",
          },
        },
        {
          $unwind: { path: "$question", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "comments",
            let: { reviewId: "$$reviewId", question: "$question._id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$question", "$$question"],
                      },
                      {
                        $eq: ["$review", "$$reviewId"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "comment",
          },
        },
        {
          $unwind: { path: "$comment", preserveNullAndEmptyArrays: true },
        }, {
          $addFields: {
            comment: "$comment.text",
          },
        },
      ],
      as: "answers",
    },
  },
  {
    $unwind: { path: "$answers", preserveNullAndEmptyArrays: true },
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
    $unwind: "$user",
  },
  {
    $unwind: { path: "$organization", preserveNullAndEmptyArrays: true },
  },
  {
    $unwind: { path: "$question", preserveNullAndEmptyArrays: true },
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
  // get the current organization names
  {
    $lookup: {
      from: "organizations",
      localField: "user.currentAgency",
      foreignField: "_id",
      as: "user.currentAgency",
    },
  },
  {
    $lookup: {
      from: "organizations",
      localField: "user.currentPayroll",
      foreignField: "_id",
      as: "user.currentPayroll",
    },
  },
  {
    $lookup: {
      from: "organizations",
      localField: "user.currentWorksite",
      foreignField: "_id",
      as: "user.currentWorksite",
    },
  },
  {
    $lookup: {
      from: "organizations",
      localField: "user.currentCompany",
      foreignField: "_id",
      as: "user.currentCompany",
    },
  },
  // //  group each review
  {
    $group: {
      _id: "$_id",
      "Review date": { $first: "$createdAt" },
      "Overall star rating": { $first: "$rate" },
      "Overall Review": { $first: "$overallReview.text" },
      "Last Use": { $first: "$lastUse" },
      answers: { $push: "$answers" },
      user: { $first: "$user" },
      organization: { $first: "$organization" },
    },
  },
  {
    $project: {
      _id: 1,
      "Review date": 1,
      "Overall star rating": 1,
      "Overall Review": 1,
      "earwig ID": "$user.userId",
      "Unique User ID": "$user._id",
      "Current agency": "$user.currentAgency.name",
      "Current payroll": "$user.currentPayroll.name",
      "Current worksite": "$user.currentWorksite.name",
      "Current company": "$user.currentCompany.name",
      "Town or City": "$user.city",
      "Points earned": "$user.points",
      "People helped": "$user.helpedUsers",
      "Reviews given": { $size: "$user.givenReviews" },
      Trade: { $arrayElemAt: ["$user.trade.title", 0] },
      "Entity type": "$organization.category",
      "Entity name": "$organization.name",
      "Last Use": 1,
      "Date to": 1,
      "answers._id": 1,
      "answers.answer": 1,
      "answers.comment": 1,
      "answers.question.text": 1,
      "answers.question.category": 1,
    },
  },
]);
