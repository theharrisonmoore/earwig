/**
 * get all reviews to be rendered for the admin
 * can get all reviews or the awaiting review only
 * @param {awaitingReview} - optional - if exists then return the awaiting review only
 */

const boom = require("boom");

const { getAllReviews } = require("./../../database/queries/reviews");

module.exports = (req, res, next) => {
  const { organisation, awaitingReview } = req.query;

  const filters = {
    awaitingReview: awaitingReview === "true",
    organisation,
  };

  getAllReviews(filters)
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      next(boom.badImplementation(err));
    });
};
