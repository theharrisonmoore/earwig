const boom = require("boom");
const jwt = require("jsonwebtoken");

const { findByEmail, addNew } = require("./../database/queries/user");
const confirmJoiningMailList = require("./../helpers/confirmJoiningMailList");

const { tokenMaxAge } = require("./../constants");

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  // check if the email is already exist
  findByEmail(email)
    .then((storedUser) => {
      if (storedUser) {
        // email already exist
        return next(boom.conflict("Email already taken"));
      }

      // create new user
      return addNew({ email, password })
        .then(async (user) => {
          // send email to ask user to join earwig mail list
          await confirmJoiningMailList(email, user._id);
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
            process.env.SECRET,
            { expiresIn: tokenMaxAge.string },
          );

          res.cookie("token", token, { maxAge: tokenMaxAge.number, httpOnly: true });

          // send the user info
          return res.json(userInfo);
        })
        .catch(() => next(boom.badImplementation()));
    })
    .catch(() => next(boom.badImplementation()));
};
