/**
 * edit profile contoller
 * allow the user to change the password or/and update the verification image
 *
 * @param {oldPassword} -string- plain old password
 * @param {newPassword} -string- plain new password
 * if image uploaded then store it in the DB
 *
 */

const boom = require("boom");
const { compare, hash } = require("bcryptjs");

const { getUserById, updateUserById } = require("./../database/queries/user");

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { user } = req;
  const updateData = {};

  // if the user uploaded photo add the new photo to the data object to be updated
  let uploadedFileName;
  if (req.file) {
    // eslint-disable-next-line prefer-destructuring
    uploadedFileName = req.file.uploadedFileName;
  }

  try {
    const userInfo = await getUserById(user.id);
    if (!userInfo) {
      return next(boom.unauthorized("Wronge password"));
    }

    if (uploadedFileName) {
      updateData.verificationPhoto = uploadedFileName;
    } if (oldPassword && newPassword) {
      // hash password
      const matched = await compare(oldPassword, userInfo.password);
      if (!matched) {
        return next(boom.unauthorized("Wronge password"));
      }

      const hashedPassword = await hash(newPassword, 8);
      updateData.password = hashedPassword;
    }

    await updateUserById(userInfo.id, updateData);

    return res.send();
  } catch (error) {
    next(boom.badImplementation());
  }
};
