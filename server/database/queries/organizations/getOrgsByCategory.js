const Organization = require("../../models/Organization");

module.exports = category => Organization.aggregate([
  {
    $match: {
      category,
    },
  }, {
    $project: {
      name: { $ifNull: ["$name", "N/A"] },
      phoneNumber: { $ifNull: ["$phoneNumber", "N/A"] },
      email: { $ifNull: ["$email", "N/A"] },
      websiteURL: { $ifNull: ["$websiteURL", "N/A"] },
      key: "$_id",
      active: { $ifNull: ["$active", "N/A"] },
    },
  },
]);
