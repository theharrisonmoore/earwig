const Helpfulness = require("./../../models/Helpfulness");

module.exports = ({
  helpfulUser, helpedUser, target, organization, review, points,
}) => {
  if (points > 0) {
    return Helpfulness.updateOne(
      // filters
      {
        fromReferral: false, helpfulUser, helpedUser, target, review, organization,
      }, {
        // update data
        points,
      }, {
        // options
        upsert: true,
      },
    );
  }
  return Helpfulness.deleteOne({
    fromReferral: false, helpfulUser, helpedUser, target, review, organization,
  });
};
