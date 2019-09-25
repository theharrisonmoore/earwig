const User = require("../../models/User");

module.exports = (awaitingReview) => {
  const match = {
    isAdmin: false,
  };

  if (awaitingReview === true) {
    match.awaitingReview = true;
  }

  return User.aggregate([
    {
      $match: match,
    },
    {
      $lookup: {
        from: "trades",
        localField: "trade",
        foreignField: "_id",
        as: "trade",
      },
    },
    // {
    //   $lookup: {
    //     from: "organizations",
    //     localField: "trade",
    //     foreignField: "_id",
    //     as: "trade",
    //   },
    // },
    {
      $lookup: {
        from: "organizations",
        localField: "currentAgency",
        foreignField: "_id",
        as: "currentAgency",
      },
    },
    {
      $lookup: {
        from: "organizations",
        localField: "currentCompany",
        foreignField: "_id",
        as: "currentCompany",
      },
    },
    {
      $lookup: {
        from: "organizations",
        localField: "currentPayroll",
        foreignField: "_id",
        as: "currentPayroll",
      },
    },
    {
      $lookup: {
        from: "organizations",
        localField: "currentWorksite",
        foreignField: "_id",
        as: "currentWorksite",
      },
    },
    {
      $project: {
        status: {
          $cond: {
            if: { $eq: [true, "$verified"] },
            then: "verified",
            else: {
              $cond: {
                if: { $eq: [true, "$awaitingReview"] },
                then: "awaiting review",
                else: "unverified",
              },
            },
          },
        },
        email: 1,
        userId: 1,
        city: { $ifNull: ["$city", "N/A"] },
        key: "$_id",
        trade: { $arrayElemAt: ["$trade", 0] },
        worksFor: { $ifNull: ["$worksFor", "N/A"] },
        verified: 1,
        awaitingReview: 1,
        currentAgency: { $arrayElemAt: ["$currentAgency", 0] },
        currentCompany: { $arrayElemAt: ["$currentCompany", 0] },
        currentPayroll: { $arrayElemAt: ["$currentPayroll", 0] },
        currentWorksite: { $arrayElemAt: ["$currentWorksite", 0] },
        currentOrg: {
          agency: { $arrayElemAt: ["$currentAgency", 0] },
          company: { $arrayElemAt: ["$currentCompany", 0] },
          payroll: { $arrayElemAt: ["$currentPayroll", 0] },
          worksite: { $arrayElemAt: ["$currentWorksite", 0] },
        },
      },
    },
    {
      $addFields: {
        trade: { $ifNull: ["$trade.title", "N/A"] },
        currentAgency: { $ifNull: ["$currentAgency.name", "N/A"] },
        currentCompany: { $ifNull: ["$currentCompany.name", "N/A"] },
        currentPayroll: { $ifNull: ["$currentPayroll.name", "N/A"] },
        currentWorksite: { $ifNull: ["$currentWorksite.name", "N/A"] },
        currentOrg: { $cond: [{ $gt: ["$currentOrg", {}] }, "$currentOrg", "N/A"] },
      },
    },
  ]);
};
