const boom = require("boom");
const { patchReviewField } = require("./../../database/queries/reviews");

const updateReviewFields = (req, res, next) => {
  const { data } = req.body;
  const { id: reviewId } = req.params;
  patchReviewField(reviewId, data)
    .then((result) => {
      if (!result) {
        next(boom.notFound("error updating!"));
      } else {
        res.json(result);
      }
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};

module.exports = { updateReviewFields };
