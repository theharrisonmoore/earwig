/**
 * add comment on review
 * can be on overall or voice depends on the 'target'
 * @param {target} - string - "overall" or "voice"
 * @param {text} -string - comment words
 * @param {displayName} - string - the name to be displayed {for admin only}
 * @param {reviewId} - mongoID - review id
 *
 * @todo add condition to check for voice target - sprint 2 -
 */

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
