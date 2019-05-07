const boom = require("boom");

const Question = require("../models/Question");
const Organization = require("../models/Organization");


// return the questions grouped by Org. category
const getQuetionsByOrg = org => new Promise((resolve, reject) => {
  Question.aggregate([
    // match by org type
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
        // get the first one each similar group.
        group: { $first: "$group" },
        // push all the group questions to array.
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


const getOrganizationsByType = category => Organization.find({ category });

// get an array of the organizaions names by category
const getOrgsNamesByType = category => new Promise((resolve, reject) => {
  Organization.aggregate([
    {
      $match: { category },
    },
    {
      $group: { _id: "$category", category: { $push: "$$CURRENT.name" } },
    },
  ])
    .then(resolve)
    .catch(reject);
});

// get the names for agencies and payrolls to render the dropdown list.
// agency: [name1, name2, name3],
// payroll: [name1, name2, name3]
const getAgenciesAndPayrollsNames = () => new Promise((resolve, reject) => {
  Organization.aggregate([
    {
      $match: { $or: [{ category: "agency" }, { category: "payroll" }] },
    },
    {
      $group: { _id: "$category", category: { $push: "$$CURRENT.name" } },
    },
    {
      $sort: { _id: 1 },
    },
  ])
    .then(resolve)
    .catch(reject);
});

// save an org the db
const postOrg = async (category, name) => {
  try {
    const org = new Organization({
      category,
      name,
    });
    await org.save();
  } catch (err) {
    boom.badImplementation();
  }
};

module.exports = {
  getQuetionsByOrg,
  getOrganization,
  getQuestionsByOrgCategory,
  getOrganizationsByType,
  getOrgsNamesByType,
  getAgenciesAndPayrollsNames,
  postOrg,
};
