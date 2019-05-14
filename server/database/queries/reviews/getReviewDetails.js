// gets review by id and gets all answers/ questions related to that review
// used in admin panel to show review answers

const mongoose = require("mongoose");
const Answer = require("./../../models/Answer");

module.exports = reviewID => new Promise((resolve, reject) => {
  Answer.aggregate([
    // get all answers related to the review
    {
      $match: { review: mongoose.Types.ObjectId(reviewID) },
    },
    // insert question info
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
      $group: {
        _id: {
          $arrayElemAt: ["$question.group.name", 0],
        },
        answers: { $push: "$$CURRENT" },
        group: {
          $push: {
            $arrayElemAt: ["$question.group", 0],
          },
        },
      },
    },
    {
      $addFields: {
        group: {
          $arrayElemAt: ["$group", 0],
        },
      },
    },
    {
      $sort: {
        "group.groupOrder": 1,
      },
    },
  ])
    .then(resolve)
    .catch(err => reject(err));
});
