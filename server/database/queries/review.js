const { Types: { ObjectId } } = require("mongoose");
const Question = require("../models/Question");
const Organization = require("../models/Organization");
const Review = require("../models/Review");
const Helpfulness = require("../models/Helpfulness");


// return hepflness by review id
const getReviewHelpfulness = id => Helpfulness.findOne({ review: id });

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
const getOrganizationById = orgId => Organization.findById(orgId);

const getQuestionsByOrgCategory = category => Question.find({ category }).sort({ number: 1 });


const getOrganizationsByType = category => Organization.find({ category });

// get the names of orgs. to show on the dropdown list
const getOrgsNamesByType = category => Organization.aggregate([
  {
    $match: { category },
  },
  {
    $group: { _id: "$category", category: { $push: { name: "$$CURRENT.name", _id: "$$CURRENT._id" } } },
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


const findReviewById = reviewId => Review.findOne({ _id: reviewId });
const findReviewByIdAndUpdate = (reviewId, { rate, text, workPeriod }) => Review.findOneAndUpdate({ _id: reviewId }, { rate, workPeriod, "overallReview.text": text }, { new: true });

module.exports = {
  getQuetionsByOrg,
  getOrganizationById,
  getOrganization,
  getQuestionsByOrgCategory,
  getOrganizationsByType,
  getOrgsNamesByType,
  getAgenciesAndPayrollsNames,
  postOrg,
  getReviewDetails,
  findReviewById,
  findReviewByIdAndUpdate,
  getReviewHelpfulness,
};
