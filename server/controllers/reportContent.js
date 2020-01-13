/**
 * report piece of content can be (worksite image, reply, comment, overall review)
 * this send an email to the admin, that contains the reported content
 */


const boom = require("boom");

const sendEmail = require("./../helpers/emails");

module.exports = (req, res, next) => {
  const {
    reason,
    description,
    target,
    orgId,
    orgName,
    questionText,
    commentText,
    reportedUserId,
    reportedReviewUserId,
    reportedReviewText,
    reportedReplyUserId,
    reportedReplyText,
    image,
  } = req.body;
  const { user } = req;

  sendEmail.reportMailing({
    reporterUserId: user.userId,
    reporterEmail: user.email,
    questionText,
    commentText,
    reportedUserId,
    reportedReviewUserId,
    reportedReviewText,
    reportedReplyUserId,
    reportedReplyText,
    reason,
    description,
    target,
    orgId,
    orgName,
    image,
  }).then(() => {
    res.json({ message: "sent" });
  }).catch((err) => {
    next(boom.badImplementation(err));
  });
};
