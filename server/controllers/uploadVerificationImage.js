/**
 * update user info and upload verification image
 * update the user state to awaiting review
 * @param {tradeId} - mongoID - selectedtrade id
 * @param {city} - string - user's city
 * @param {uploadedFileName} -string - uploaded image name to be stored in the DB
 *
 */

const boom = require("boom");
const verificationPhotoEmail = require("../helpers/emails/verificationPhotoEmail");

const { updateUserById } = require("./../database/queries/user");

module.exports = async (req, res, next) => {
  // to be updated when authentication is ready
  const { user, fieldName } = req;
  const { tradeId, city } = req.body;
  const { uploadedFileName } = req.file;
  updateUserById(user._id, {
    trade: tradeId,
    awaitingReview: true,
    verificationPhoto: uploadedFileName,
    city,
  })
    .then(async () => {
      if (fieldName === "verificationImage") {
        // send an email to admin
        await verificationPhotoEmail();
      }
      res.send();
    }).catch((err) => {
      next(boom.badImplementation(err));
    });
};
