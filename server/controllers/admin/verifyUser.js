/**
 * update the user state to be verified
 * remove the verificcation image from DB
 * @todo delete verification image from google storage
 * @param {id} mongoID - user id
 */

const boom = require("boom");
const approvalEmail = require("./../../helpers/emails/approvalEmail");


const {
  updateUserById,
  getUserById,
  updateUserPoints,
  updateUserHelpedPoints,
} = require("./../../database/queries/user");

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
      await updateUserPoints(user.referral, referralPoints);
      await updateUserHelpedPoints(user.referral);
    }

    // send aprroval email
    await approvalEmail(user.email);

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation());
  }
};
