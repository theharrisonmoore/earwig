const { verify } = require("jsonwebtoken");
const boom = require("boom");

const config = require("../config");

const { getUserById } = require("./../database/queries/user");

module.exports = (req, res, next) => {
  // get cookies from the request
  const { cookies } = req;

  // if no cookies or token send unauthorized error
  if (!cookies || !cookies.token) {
    req.sqreen.auth_track(false);
    return next(boom.unauthorized("no credentials"));
  }

  // verify the token
  return verify(cookies.token, config.server.secret, (err, decoded) => {
    // if not valid send unauthorized error
    if (err) {
      res.clearCookie("token");
      req.sqreen.auth_track(false);
      return next(boom.unauthorized("credentials are not valid"));
    }

    // get the user  Id from token
    const { id } = decoded;
    return getUserById(id, true)
      .then((user) => {
        if (!user) {
          res.clearCookie("token");
          req.sqreen.auth_track(false);
          return next(boom.unauthorized("credentials are not valid"));
        }

        // put the user info in the req to be accessed in the next middlewares
        req.user = user;
        req.sqreen.auth_track(true, { email: user.email });
        return next();
      }).catch(error => next(boom.badImplementation(error)));
  });
};
