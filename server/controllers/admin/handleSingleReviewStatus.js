const boom = require("boom");
const { approveRejectReview } = require("./../../database/queries/reviews");

module.exports = (req, res, next) => {
  const { id, bool } = req.body;
  approveRejectReview(id, bool)
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
