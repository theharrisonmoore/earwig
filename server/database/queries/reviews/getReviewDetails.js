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
    // inser comment info
    {
      $lookup: {
        from: "comments",
        localField: "comment",
        foreignField: "_id",
        as: "comment",
      },
    },
    {
      $project: {
        question: {
          _id: 1,
          text: 1,
          hintText: 1,
          type: 1,
        },
        answer: 1,
        comment: 1,
      },
    },
  ])
    .then(resolve)
    .catch(err => reject(err));
});
