const { Types: { ObjectId } } = require("mongoose");
const Question = require("../models/Question");
const Organization = require("../models/Organization");
const Review = require("../models/Review");


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

// YourSchema.find()
// .populate(`{
// path: 'map_data',
// populate: {path: 'location' }
// }`).exec(...)


// const getReviewDetails = (org, user) => Review.find({ organization: ObjectId(org), user: ObjectId(user) }).populate({
//   path: "organization",
//   populate: {
//     path: "question",
//   },
// });

const getReviewDetails = (org, user) => Review.aggregate([
  {
    $match: { organization: ObjectId(org), user: ObjectId(user) },
  },
  {
    $sort: { createdAt: -1 },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "answers",
      let: { reviewId: "$_id" },
      pipeline: [
        {
          $match:
          {
            $expr: { $eq: ["$review", "$$reviewId"] },
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
      ],
      as: "answers",
    },
  },
]);


module.exports = {
  getQuetionsByOrg,
  getOrganization,
  getQuestionsByOrgCategory,
  getOrganizationsByType,
  getOrgsNamesByType,
  getAgenciesAndPayrollsNames,
  postOrg,
  getReviewDetails,
};
