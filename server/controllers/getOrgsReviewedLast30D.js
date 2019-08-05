const boom = require("boom");

const { getOrgsReviewedLast30D } = require("../database/queries/reviews");

// get a list of organisations ids that reviewd by the user withing the 30 days
module.exports = (req, res, next) => {
  const { user } = req;
  getOrgsReviewedLast30D(user._id)
    .then((reviews) => {
      const orgsIds = reviews.map(review => review.organization);
      res.json({ orgsIds });
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
