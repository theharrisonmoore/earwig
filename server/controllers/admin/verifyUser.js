/**
 * update the user state to be verified
 * remove the verificcation image from DB
 * @param {id} mongoID - user id
 */

const boom = require("boom");
const sendEmail = require("./../../helpers/emails");


const {
  updateUserById,
  getUserById,
  updateUserHelpfulPoints,
} = require("./../../database/queries/user");
const { updateHelpfulPoints } = require("./../../database/queries/reviews");

const deleteFile = require("./../../helpers/deleteFile");

const { referralPoints } = require("./../../constants");

module.exports = async (req, res, next) => {
  const { id } = req.body;
  const updateData = {
    awaitingReview: false,
    verified: true,
    verificationPhoto: undefined,
  };

  try {
    const user = await getUserById(id);

    if (!user) {
      return next(boom.notFound("user not found!"));
    }
    if (!user.verificationPhoto) {
      return next(boom.badData("the user has no verification image"));
    }
    // update user state
    await updateUserById(id, updateData);

    try {
      // delete verification photo from google storage
      if (process.env.NODE_ENV !== "test") {
        await deleteFile(user.verificationPhoto);
      }
    } catch (error) {
      if (error.message === "file is no longer available") {
        return next(boom.badData(error));
      }
      return next(boom.badImplementation());
    }

    if (user.referral) {
      await updateHelpfulPoints({
        points: referralPoints,
        helpfulUser: user.referral,
        helpedUser: id,
        fromReferral: true,
      });
      await updateUserHelpfulPoints(user.referral);
    }

    // send aprroval email
    await sendEmail.approvalEmail(user.email);

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation());
  }
};
