const boom = require("boom");
const { findUserByToken, updateUserById } = require("./../database/queries/user");


module.exports = async (req, res, next) => {
  const { token, newPassword } = req.body;
  // check if the token is valid
  findUserByToken(token)
    .then((user) => {
      if (!user) {
        next(boom.badRequest("Your token has been expired reset the password again"));
      }

      // update the user's new password and delete the token
      const updateData = {
        password: newPassword,
        resetToken: {
          value: undefined,
          expiresIn: undefined,
        },
      };
      return updateUserById(user.id, updateData);
    }).then(() => {
      // send success response
      res.json({ success: true });
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
