const Helpfulness = require("./../../models/Helpfulness");

module.exports = ({
  helpfulUser, helpedUser, target, organization, review, points,
}) => Helpfulness.updateOne(
  // filters
  {
    fromReferral: false, helpfulUser, helpedUser, target, review, organization,
  }, {
    points,
  }, {
    upsert: true,
  },
);
