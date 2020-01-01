const boom = require("boom");

const { updateHelpfulPoints } = require("../database/queries/reviews");
const { updateUserHelpfulPoints } = require("./../database/queries/user");

module.exports = async (req, res, next) => {
  const {
    points, organization, userId, comment,
  } = req.body;

  const {
    reviewId, target,
  } = req.params;
  const { user } = req;

  if (!["overallReview", "voiceReview", "comment"].includes(target)) {
    return next(boom.badRequest("invalid arguments"));
  }

  // currently the points must be 0 or 1
  if (points !== 1 && points !== 0) {
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
    comment,
  }).then(() => updateUserHelpfulPoints(userId))
    .then((updateData) => {
      res.json(updateData);
    })
    .catch((err) => {
      next(boom.badImplementation(err));
    });
};
