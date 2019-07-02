const boom = require("boom");

const { findReviewById } = require("./../database/queries/review");

module.exports = async (req, res, next) => {
  const { id: reviewId } = req.params;
  try {
    const review = await findReviewById(reviewId);
    const hasVotes = !!review.overallReview.votes.length;
    const hasVoiceVotes = !!review.voiceReview.votes.length;
    if (!hasVotes || !hasVoiceVotes) {
      return res.send({ orgId: review.organization });
    }
    return next(boom.unauthorized());
  } catch (error) {
    return next(boom.badImplementation());
  }
};
