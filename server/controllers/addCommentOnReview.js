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

const {
  addCommentOnOverallReview,
  findById,
} = require("./../database/queries/reviews");

const { getUserById } = require("./../database/queries/user");

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

  // check if the last reply was by admin, if so reject request
  const review = await findById(reviewId);
  const { replies } = review[target];

  if (replies.length > 0) {
    const lastReply = replies[replies.length - 1];
    const foundUser = await getUserById(lastReply.user, true);
    if (foundUser.isAdmin) {
      return next(
        boom.forbidden("No further replies are allowed on this comment."),
      );
    }
  }

  try {
    await addCommentOnOverallReview(reviewId, data, target);
    return res.json();
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
