const boom = require("boom");
const crypto = require("crypto");
const { findByEmail, updateUserById } = require("./../database/queries/user");
const { resetTokenMaxAge } = require("./../constants");
const resetPasswordMailing = require("../helpers/resetPasswordMailing");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return next(boom.badImplementation());
    }
    const token = buffer.toString("hex");
    return findByEmail(email)
      .then((user) => {
        if (!user) {
          return next(boom.notFound("No account with that email found."));
        }

        const updateData = {
          resetToken: {
            value: token,
            expiresIn: Date.now() + resetTokenMaxAge,
          },
        };
        return updateUserById(user._id, updateData);
      })
      .then(() => {
        // generate set password link
        const domain = process.env.DOMAIN;
        const link = `${domain}/set-password/${token}`;

        // send the link via email
        return resetPasswordMailing(email, link);
      }).then(() => {
        //  send success message
        res.json({ success: true });
      })
      .catch(() => {
        next(boom.badImplementation());
      });
  });
};
