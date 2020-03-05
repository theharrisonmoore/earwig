/**
 * get all replies on an overall review
 * @param {id} reviewId
 */

const boom = require("boom");

const { getOverallReplies } = require("../database/queries/reviews");

module.exports = (req, res, next) => {
  const { user } = req;
  const { id, target } = req.params;

  const userId = user && user._id;

  getOverallReplies(id, target, userId)
    .then(replies => {
      res.json(replies);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
