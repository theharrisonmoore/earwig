/**
 * get all replies on an overall review
 * @param {id} reviewId
 */

const boom = require("boom");

const { getOverallReplies } = require("../database/queries/reviews");

module.exports = (req, res, next) => {
  const { id } = req.params;

  getOverallReplies(id)
    .then((replies) => {
      console.log(replies[0].replies.user.trade[0].title);
      res.json(replies);
    })
    .catch(() => next(boom.badImplementation()));
};
