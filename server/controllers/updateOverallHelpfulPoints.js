const boom = require("boom");

const { updateOverallHelpfullPoints } = require("../database/queries/reviews");
const { updateUserPoints } = require("../database/queries/user");

module.exports = async (req, res, next) => {
  const { points, prevPoints, userId } = req.body;
  const { reviewId } = req.params;
  const { user } = req;

  const diffPoints = points - prevPoints;
  const promises = [
    updateOverallHelpfullPoints({ reviewId, userId: user._id, points }),
    updateUserPoints(userId, diffPoints),
  ];

  Promise.all(promises)
    .then(() => {
      res.json({ updatedPoints: points });
    })
    .catch((err) => {
      next(boom.badImplementation(err));
    });
};
