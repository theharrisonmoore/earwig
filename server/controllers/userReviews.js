
const boom = require("boom");

const getUserReviewsQuery = require("../database/queries/reviews/getUserReviews");


const getUserReviews = async (req, res, next) => {
  const { user } = req;
  try {
    const userReviews = await getUserReviewsQuery(user._id);
    res.send(userReviews);
  } catch (err) {
    next(boom.badImplementation());
  }
};

module.exports = getUserReviews;
