const boom = require("boom");

const { addCommentOnOverallReview } = require("./../database/queries/reviews");

module.exports = async (req, res, next) => {
  const {
    text, displayName, reviewId, target,
  } = req.body;

  const { user } = req;
  const data = {
    text,
    user: user._id,
  };

  if (user.isAdmin) {
    data.displayName = displayName;
  }
  try {
    if (target === "overall") {
      await addCommentOnOverallReview(reviewId, data);
      res.json();
    }
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
