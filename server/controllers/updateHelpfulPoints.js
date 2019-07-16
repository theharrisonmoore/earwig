const boom = require("boom");

const { updateHelpfulPoints } = require("../database/queries/reviews");

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

  // const diffPoints = points - prevPoints;

  const promises = [
    updateHelpfulPoints({
      helpfulUser: userId,
      helpedUser: user._id,
      target,
      organization,
      review: reviewId,
      points,

      //
      // reviewId,
      // userId: user._id,
      // points,
      // target,
      // diffPoints,
    }),
  ];

  return Promise.all(promises)
    .then(() => {
      res.json({ updatedPoints: points });
    })
    .catch((err) => {
      next(boom.badImplementation(err));
    });
};
