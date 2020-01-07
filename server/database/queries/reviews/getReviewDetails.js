// gets review by id and gets all answers/ questions related to that review
// used in admin panel to show review answers

const mongoose = require("mongoose");
const Review = require("./../../models/Review");

module.exports = reviewID => Review.aggregate([
  {
    $match: { _id: mongoose.Types.ObjectId(reviewID) },
  },
  {
    // get organisation details
    $lookup: {
      from: "organizations",
      localField: "organization",
      foreignField: "_id",
      as: "organization",
    },
  }, {
    $unwind: "$organization",
  }, {
    // get all questions for the organisation type
    $lookup: {
      from: "questions",
      localField: "organization.category",
      foreignField: "category",
      as: "question",
    },
  }, {
    $unwind: { path: "$question", preserveNullAndEmptyArrays: true },
  },
  {
    // get all question's answers
    $lookup: {
      from: "answers",
      let: { organization: "$organization._id", question: "$question._id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$question", "$$question"] },
                { $eq: ["$organization", "$$organization"] },
              ],
            },
          },
        },
      ],
      as: "answer",
    },
  },
  {
    $unwind: { path: "$answer", preserveNullAndEmptyArrays: true },
  },
  // get comments
  {
    $lookup: {
      from: "comments",
      let: { organization: "$organization._id", question: "$question._id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$question", "$$question"] },
                { $eq: ["$organization", "$$organization"] },
                { $eq: ["$review", mongoose.Types.ObjectId(reviewID)] },

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
  },
  {
    $group: {
      _id: "$question.group.name",
      questions: { $push: "$$CURRENT" },
      group: {
        $first: "$question.group"
        ,
      },
    },
  },
  {
    $sort: {
      "group.groupOrder": 1,
    },
  },
]);
