const Question = require("../models/Question");
const Organization = require("../models/Organization");


// return the questions grouped by Org. category
const getQuetionsByOrg = org => new Promise((resolve, reject) => {
  Question.aggregate([
    {
      $match: {
        category: org,
      },

    },
    {
      $sort: { number: 1 },
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

const getOrganization = (category, name) => Organization.findOne({ category, name });

const getQuestionsByOrgCategory = category => Question.find({ category }).sort({ number: 1 });


module.exports = { getQuetionsByOrg, getOrganization, getQuestionsByOrgCategory };
