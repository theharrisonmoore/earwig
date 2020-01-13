const Helpfulness = require("./../../models/Helpfulness");

const updateHelpfulPoints = ({
  helpfulUser, helpedUser, target, organization, review, points, fromReferral, comment,
}) => {
  if (points > 0) {
    let match = {
      helpfulUser, helpedUser, fromReferral,
    };

    if (!fromReferral) {
      match = {
        ...match, target, review, organization, comment,
      };
    }
    return Helpfulness.updateOne(
      // filters
      { ...match },
      {
        // update data
        points,
      }, {
        // options
        upsert: true,
      },
    );
  }

  return Helpfulness.deleteOne({
    fromReferral: false, helpfulUser, helpedUser, target, review, organization, comment,
  });
};

module.exports = updateHelpfulPoints;
