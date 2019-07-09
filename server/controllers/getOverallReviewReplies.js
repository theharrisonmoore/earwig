/**
 * get all replies on an overall review
 * @param {id} reviewId
 */

const boom = require("boom");

const { getOverallReplies } = require("../database/queries/reviews");

module.exports = (req, res, next) => {
  const { id, target } = req.params;

  getOverallReplies(id, target)
    .then((replies) => {
      res.json(replies);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
