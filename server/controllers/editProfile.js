/**
 * edit profile contoller
 * allow the user to change the password
 * or/and update the verification image
 * or/and update username
 *
 * @param {oldPassword} -string- plain old password
 * @param {newPassword} -string- plain new password
 * @param {newUsername} -string- plain new username
 * @param {newTrade} -string- plain new trade ID
 * if image uploaded then store it in the DB
 *
 */

const boom = require("boom");
const { compare, hash } = require("bcryptjs");

const { getUserById, updateUserById, getUserByUsername } = require("./../database/queries/user");

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const {
    oldPassword, newPassword, newUsername, newTrade,
  } = req.body;
  const { user } = req;
  const updateData = {};

  console.log(newTrade);
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
    }
    if (oldPassword && newPassword) {
      // hash password
      const matched = await compare(oldPassword, userInfo.password);
      if (!matched) {
        return next(boom.unauthorized("Incorrect password"));
      }

      const hashedPassword = await hash(newPassword, 8);
      updateData.password = hashedPassword;
    }
    if (newUsername) {
      // update userId/name

      // check if username already exists
      const usernameExists = await getUserByUsername(newUsername);
      if (usernameExists) {
        return next(boom.notAcceptable("Username already taken"));
      }
      updateData.userId = newUsername;
    }
    if (newTrade) {
      updateData.trade = newTrade;
    }
    console.log("update", updateData);
    const updatedUser = await updateUserById(userInfo.id, updateData);

    return res.json(updatedUser);
  } catch (error) {
    next(boom.badImplementation());
  }
};
