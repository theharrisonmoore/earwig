const Question = require("../models/Question");

const getQuetionsByOrg = org => new Promise((resolve, reject) => {
  Question.aggregate([
    {
      $match: {
        category: org,
      },

    },
    {
      $group: {
        _id: "$group.name",
        group: { $first: "$group" },
        questions: { $push: "$$CURRENT" },
      },
    },
    {
      $sort: {
        "group.groupOrder": 1,
      },
    },
  ])
    .then(resolve)
    .catch(reject);
});

module.exports = { getQuetionsByOrg };
