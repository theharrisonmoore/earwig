const boom = require("boom");

const { updateHelpfulPoints } = require("../database/queries/reviews");
const { updateUserHelpfulPoints } = require("./../database/queries/user");

module.exports = async (req, res, next) => {
  const {
    points, organization, userId,
  } = req.body;

  const {
    reviewId, target,
  } = req.params;
  const { user } = req;

  if (!["overallReview", "voiceReview"].includes(target)) {
    return next(boom.badRequest("invalid arguments"));
  }


  return updateHelpfulPoints({
    helpfulUser: userId,
    helpedUser: user._id,
    target,
    organization,
    review: reviewId,
    points,
    fromReferral: false,
  }).then(() => updateUserHelpfulPoints(userId))
    .then(() => {
      res.json({ updatedPoints: points });
    })
    .catch((err) => {
      next(boom.badImplementation(err));
    });
};
