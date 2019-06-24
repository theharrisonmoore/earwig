const boom = require("boom");

const { updateOverallHelpfullPoints } = require("../database/queries/reviews");

module.exports = async (req, res, next) => {
  const { points } = req.body;
  const { reviewId } = req.params;
  const { user } = req;

  updateOverallHelpfullPoints({ reviewId, userId: user._id, points })
    .then(() => {
      res.json({ updatedPoints: points });
    }).catch((err) => {
      next(boom.badImplementation(err));
    });
};
