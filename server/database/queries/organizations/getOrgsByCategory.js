const Organization = require("../../models/Organization");

// if category is all -> return all
module.exports = (category) => {
  console.log(category);
  if (category === "all") {
    return Organization.aggregate([
      {
        $project: {
          name: { $ifNull: ["$name", "N/A"] },
          phoneNumber: { $ifNull: ["$phoneNumber", "N/A"] },
          email: { $ifNull: ["$email", "N/A"] },
          websiteURL: { $ifNull: ["$websiteURL", "N/A"] },
          category: 1,
          key: "$_id",
          active: { $ifNull: ["$active", "N/A"] },
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);
  }
  return Organization.aggregate([
    {
      $match: {
        category,
      },
    },
    {
      $project: {
        name: { $ifNull: ["$name", "N/A"] },
        phoneNumber: { $ifNull: ["$phoneNumber", "N/A"] },
        email: { $ifNull: ["$email", "N/A"] },
        websiteURL: { $ifNull: ["$websiteURL", "N/A"] },
        category: 1,
        key: "$_id",
        active: { $ifNull: ["$active", "N/A"] },
      },
    },
    {
      $sort: { name: 1 },
    },
  ]);
};
