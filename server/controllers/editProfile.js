const boom = require("boom");
const { compare, hash } = require("bcryptjs");
const User = require("./../database/models/User");

const { findById, updateUserById } = require("./../database/queries/user");

module.exports = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;


  const fakeUser = await User.findOne();

  return findById(fakeUser.id)
    .then((user) => {
      // validate old password
      compare(oldPassword, user.password)
        .then((matched) => {
          if (!matched) {
            return next(boom.unauthorized("Wronge password"));
          }

          // hash the new password
          return hash(newPassword, 8, (hashError, hashedPassword) => {
            if (hashError) {
              return next(boom.badImplementation());
            }
            // update the user password with the new hashed password
            return updateUserById(fakeUser.id, { password: hashedPassword })
              .then(() => {
                res.send();
              }).catch(() => {
                next(boom.badImplementation());
              });
          });
        });
    });
};
