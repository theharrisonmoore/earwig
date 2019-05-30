/**
 * get all replies on an overall review
 * @param {id} reviewId
 */

const boom = require("@hapi/boom");

const { getOverallReplies } = require("../database/queries/reviews");

module.exports = (req, res, next) => {
  const { id } = req.params;

  getOverallReplies(id)
    .then((replies) => {
      res.json(replies);
    })
    .catch(() => next(boom.badImplementation()));
};
