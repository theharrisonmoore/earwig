const Organization = require("../../models/Organization");

module.exports = category => Organization.aggregate([
  {
    $match: {
      category,
    },
  }, {
    $project: {
      name: 1,
      phoneNumber: 1,
      email: 1,
      websiteURL: 1,
      key: "$_id",
      active: 1,
    },
  },
]);
