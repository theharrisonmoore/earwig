const boom = require("boom");

const { updateHelpfulPoints } = require("../database/queries/reviews");
const { updateUserHelpfulPoints, getUserById } = require("./../database/queries/user");

const sendEmail = require("././../helpers/emails");

module.exports = async (req, res, next) => {
  try {
    const {
      points, organization, userId, comment,
    } = req.body;

    const {
      reviewId, target,
    } = req.params;
    const { user } = req;

    if (!["overallReview", "voiceReview", "comment"].includes(target)) {
      return next(boom.badRequest("invalid arguments"));
    }

    // currently the points must be 0 or 1
    if (points !== 1 && points !== 0) {
      return next(boom.badRequest("invalid arguments"));
    }


    await updateHelpfulPoints({
      helpfulUser: userId,
      helpedUser: user._id,
      target,
      organization,
      review: reviewId,
      points,
      fromReferral: false,
      comment,
    });

    const updatedData = await updateUserHelpfulPoints(userId);
    // check if user got points

    if (points > 0) {
      const { email } = await getUserById(userId);

      await sendEmail.gotHelpfulPoints({ orgId: organization, recipientEmail: email });
    }

    return res.json(updatedData);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
