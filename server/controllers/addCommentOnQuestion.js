/**
 * add comment on an organization question
 * @param {text} -string - comment words
 * @param {displayName} - string - the name to be displayed {for admin only}
 * @param {question} - mongoID - question id
 * @param {organization} - mongoID - organization id
 */

const boom = require("boom");

const { createComment } = require("./../database/queries/comments");

module.exports = (req, res, next) => {
  const {
    text, displayName, question, organization, parentCommentId, reviewId,
  } = req.body;

  const { user } = req;
  const data = {
    text,
    question,
    organization,
    user: user._id,
    parentComment: parentCommentId,
    review: reviewId,
  };

  if (user.isAdmin) {
    data.displayName = displayName;
  }


  createComment(data)
    .then(() => {
      res.json({});
    }).catch(e => next(boom.badImplementation(e)));
};
