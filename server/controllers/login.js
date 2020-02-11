/**
 * login controller
 * @param {email} - string - the user email
 * @param {password} - string - plain password
 * @param {password} - string - plain password
 *
 * response with the user info and create new token
 *
 */

const jwt = require("jsonwebtoken");
const boom = require("boom");
const { compare } = require("bcryptjs");
const { tokenMaxAge } = require("./../constants");
const config = require("../config");

const { findByEmail } = require("./../database/queries/user");

module.exports = (req, res, next) => {
  const { email, password: plainPassword } = req.body;

  findByEmail(email)
    .then((user) => {
      if (!user) {
        // no user founded
        req.sqreen.auth_track(false, { email });
        return next(boom.unauthorized("Whoops! Either you typed something wrong or you're not registered."));
      }

      // validate password
      return compare(plainPassword, user.password)
        .then((matched) => {
          if (!matched) {
            req.sqreen.auth_track(false, { email });
            return next(boom.unauthorized("Whoops! Either you typed something wrong or you're not registered."));
          }

          // data to be sent in the response
          const userInfo = {
            id: user._id,
            trade: user.trade,
            verified: user.verified,
            awaitingReview: user.awaitingReview,
            userId: user.userId,
            points: user.points,
            isAdmin: user.isAdmin,
            email: user.email,
          };

          // create token for 30 day
          const token = jwt.sign(
            { id: user._id },
            config.server.secret,
            { expiresIn: tokenMaxAge.string },
          );
          res.cookie("token", token, { maxAge: tokenMaxAge.number, httpOnly: true });
          req.sqreen.auth_track(true, { email });

          // send the user info
          return res.json(userInfo);
        })
        .catch(err => next(boom.badImplementation(err)));
    });
};
