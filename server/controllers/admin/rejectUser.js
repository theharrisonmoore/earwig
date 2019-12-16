/**
 * reject user and update the user state to be unverified
 * remove the verificcation image from DB
 * @todo delete verification image from google storage
 * @param {id} mongoID - user id
 */

const boom = require("boom");
const sendEmail = require("./../../helpers/emails");
const { deleteDataAndProfilesAddedByUser } = require("./../../database/queries/user");
const { updateUserById, getUserById } = require("./../../database/queries/user");
const deleteFile = require("./../../helpers/deleteFile");

module.exports = async (req, res, next) => {
  const { id } = req.body;
  const updateData = {
    awaitingReview: false,
    verified: false,
    verificationPhoto: undefined,
  };

  try {
    const user = await getUserById(id);

    if (!user) {
      next(boom.notFound("user not found!"));
    } else if (!user.verificationPhoto) {
      next(boom.badData("the user has no verification image"));
    } else {
    // update user state
      await updateUserById(id, updateData);
      await deleteDataAndProfilesAddedByUser(user._id);
      // send rejection email
      await sendEmail.userRejection(user.email);

      // delete verification photo from google storage
      await deleteFile(user.verificationPhoto);

      res.json();
    }
  } catch (error) {
    if (error.message === "file is no longer available") {
      next(boom.badData(error));
    } else {
      next(boom.badImplementation());
    }
  }
};
