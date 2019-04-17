const boom = require("boom");

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


const getOrganizationsByType = category => Organization.find({ category });

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

const postOrg = async (category, name) => {
  try {
    const org = new Organization({
      category,
      name,
    });
    await org.save();
  } catch (err) {
    console.log(err);
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
