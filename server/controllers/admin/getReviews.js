/**
 * get all reviews to be rendered for the admin
 * can get all reviews or the awaiting review only
 * @param {awaitingReview} - optional - if exists then return the awaiting review only
 */

const boom = require("boom");

const { getAllReviews } = require("./../../database/queries/reviews");

module.exports = (req, res, next) => {
  const awaitingReview = req.query.awaitingReview === "true";

  getAllReviews(awaitingReview)
    .then((reviews) => {
      res.json(reviews);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
