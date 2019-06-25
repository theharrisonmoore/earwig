const Question = require("../models/Question");
const Organization = require("../models/Organization");


// return the questions grouped by Org. category
const getQuetionsByOrg = org => Question.aggregate([
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
]);


const getOrganization = (category, name) => Organization.findOne({ category, name });

const getQuestionsByOrgCategory = category => Question.find({ category }).sort({ number: 1 });


const getOrganizationsByType = category => Organization.find({ category });

const getOrgsNamesByType = category => Organization.aggregate([
  {
    $match: { category },
  },
  {
    $group: { _id: "$category", category: { $push: "$$CURRENT.name" } },
  },
]);


const getAgenciesAndPayrollsNames = () => Organization.aggregate([
  {
    $match: { $or: [{ category: "agency" }, { category: "payroll" }] },
  },
  {
    $group: { _id: "$category", category: { $push: "$$CURRENT.name" } },
  },
  {
    $sort: { _id: 1 },
  },
]);


const postOrg = (category, name) => {
  const org = new Organization({
    category,
    name,
    active: false,
  });
  return org.save();
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
