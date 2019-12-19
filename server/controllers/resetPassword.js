const boom = require("boom");
const crypto = require("crypto");
const { findByEmail, updateUserById } = require("./../database/queries/user");
const { resetTokenMaxAge } = require("./../constants");
const sendEmail = require("../helpers/emails");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  let userId;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return next(boom.badImplementation(err));
    }
    const token = buffer.toString("hex");
    return findByEmail(email)
      .then((user) => {
        if (!user) {
          return next(boom.notFound("No account with that email found."));
        }
        // eslint-disable-next-line prefer-destructuring
        userId = user.userId;

        const updateData = {
          resetToken: {
            value: token,
            expiresIn: Date.now() + resetTokenMaxAge,
          },
        };
        return updateUserById(user._id, updateData);
      })
      // send the token via email
      .then(() => sendEmail.resetPasswordMailing(email, token, userId))
      .then(() => {
        //  send success message
        res.json({ success: true });
      })
      .catch((error) => {
        next(boom.badImplementation(error));
      });
  });
};
