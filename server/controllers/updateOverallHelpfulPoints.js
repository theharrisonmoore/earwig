const boom = require("boom");

const { updateOverallHelpfullPoints } = require("../database/queries/reviews");

module.exports = async (req, res, next) => {
  const { points, prevPoints } = req.body;
  const { reviewId, target } = req.params;
  const { user } = req;

  if (!["overallReview", "voiceReview"].includes(target)) {
    return next(boom.badRequest("invalid arguments"));
  }

  const diffPoints = points - prevPoints;
  const promises = [
    updateOverallHelpfullPoints({
      reviewId, userId: user._id, points, target, diffPoints,
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
