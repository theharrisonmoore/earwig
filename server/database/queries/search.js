// gets all organizations, includes number of reviews and average ratings for each entry
const Organization = require("../models/Organization");

module.exports = category => Organization.aggregate([
  {
    $match: {
      active: true,
      category,
    },
  },
  {
    $lookup: {
      from: "reviews",
      let: { org_id: "$_id" },
      pipeline: [
        {
          $match:
            { $expr: { $eq: ["$organization", "$$org_id"] } },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userObject",
          },
        },
        {
          $match: {
            "userObject.verified": true,
          },
        },
      ],
      as: "reviews",
    },
  },
  {
    $addFields: {
      totalReviews: {
        $size: "$reviews",
      },
      avgRatings: {
        $avg: "$reviews.rate",
      },
    },
  },

  {
    $facet: {
      searchData: [
        // {
        //   $match: { _id: { $ne: null } },
        // },
        {
          $project: {
            _id: 1,
            name: 1,
            lastViewed: 1,
            category: 1,
            totalReviews: 1,
            avgRatings: 1,
          },
        },
      ],
      lastReviwed: [
        {
          $unwind: "$reviews",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            lastViewed: 1,
            category: 1,
            totalReviews: 1,
            avgRatings: 1,
            lastReviwed: "$reviews.createdAt",
          },
        },
        {
          $sort: { lastReviwed: -1 },
        },
        {
          $group: { _id: "$_id", lastReviwed: { $first: "$$CURRENT" } },
        },
        {
          $sort: { "lastReviwed.lastReviwed": -1 },
        },
        {
          $limit: 5,
        },
      ],
    },
  },
]);
