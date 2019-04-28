const boom = require("boom");

const { latestReviews } = require("../database/queries/user");

module.exports = (req, res, next) => {
  const { user } = req;

  latestReviews(user.id)
    .then((reviews) => {
      res.json(reviews);
    })
    .catch(err => next(boom.badImplementation(err)));
};
