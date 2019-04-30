const boom = require("boom");

const { getReviewDetails } = require("./../../database/queries/reviews");

module.exports = (req, res, next) => {
  const { reviewID } = req.params;
  getReviewDetails(reviewID)
    .then((details) => {
      res.json(details);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
