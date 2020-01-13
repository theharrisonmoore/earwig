/**
 * add comment on an organization question
 * @param {text} -string - comment words
 * @param {displayName} - string - the name to be displayed {for admin only}
 * @param {question} - mongoID - question id
 * @param {organization} - mongoID - organization id
 */

const boom = require("boom");

const { createComment, getCommentById } = require("./../database/queries/comments");
const { getUserById } = require("./../database/queries/user");

const sendEmail = require("./../helpers/emails");

module.exports = async (req, res, next) => {
  try {
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

    await createComment(data);

    // get parent comment user
    const parentComment = await getCommentById(parentCommentId);
    const { email } = await getUserById(parentComment.user);


    await sendEmail.gotReplies({ orgId: organization, recipientEmail: email });

    res.json({});
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
