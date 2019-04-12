const jwt = require("jsonwebtoken");
const boom = require("boom");
const { compare } = require("bcryptjs");

const { findByEmail } = require("./../database/queries/user");

module.exports = (req, res, next) => {
  const { email, password: plainPassword } = req.body;

  findByEmail(email).then((user) => {
    if (!user) {
      // no user founded
      return next(boom.unauthorized("login failed, email and password not match"));
    }

    // validate password
    return compare(plainPassword, user.password)
      .then((matched) => {
        if (!matched) {
          return next(boom.unauthorized("login failed, email and password not match"));
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
        };

        // create token for 30 day
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "30d" });
        console.log(token);

        res.cookie("token", token, { maxAge: 2592000000, httpOnly: true });

        // send the user info
        return res.json(userInfo);
      })
      .catch(() => next(boom.badImplementation()));
  });
};
