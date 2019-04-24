const boom = require("boom");

const { getAllReviews, getReviewDetails } = require("./../../database/queries/reviews");

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
