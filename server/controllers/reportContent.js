/**
 * report piece of content can be (worksite image, reply, comment, overall review)
 * this send an email to the admin, that contains the reported content
 * @param {reason} - string - the selected reason
 * @param {description} -string - the more info field
 * @param {target} - string - ["questionComment", "overallReview", "overallReply", "worksiteImage"]
 * @param {question} -object - the question that contain the reported comment
 * @param {organization} -object - the organization that contain the reported comment /overallreview
 * @param {review} -object- the target review
 * @param {comment} -object- the target comment
 * @param {reply} -object- the target reply
 * @param {image} -object- the worksite image
 */


const boom = require("boom");

const sendEmail = require("./../helpers/emails");

module.exports = (req, res, next) => {
  const {
    reason,
    description,
    target,
    question,
    organization,
    review,
    comment,
    reply,
    image,
  } = req.body;
  const { user } = req;

  sendEmail.reportMailing({
    reason,
    description,
    target,
    question,
    organization,
    review,
    comment,
    user,
    reply,
    image,
  }).then(() => {
    res.json({ message: "sent" });
  }).catch((err) => {
    next(boom.badImplementation(err));
  });
};
