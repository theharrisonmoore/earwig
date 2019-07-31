const boom = require("boom");

const getUserReviewsQuery = require("../database/queries/reviews/getUserReviews");

const getUserReviews = async (req, res, next) => {
  const { user } = req;

  try {
    const userReviews = await getUserReviewsQuery(user._id);
    console.log("urevs", userReviews);
    res.send(userReviews);
  } catch (err) {
    console.log("err", err);
    next(boom.badImplementation());
  }
};

module.exports = getUserReviews;
