const boom = require("boom");

const levels = {
  // COMMENTED_VERIFICATION_CHECK
  // LEVEL1: 1, // just logged in user
  // LEVEL2: 2, // awaiting verification user
  // LEVEL3: 3, // verified user
  // ADMIN: 4, // admin

  LEVEL1: 3, // just logged in user
  LEVEL2: 3, // awaiting verification user
  LEVEL3: 3, // verified user
  ADMIN: 4, // admin
};

module.exports = minimumLevel => (req, res, next) => {
  const { user } = req;

  const minimumLevelValue = levels[minimumLevel];

  let userLevel;
  if (!user) {
    return next(boom.unauthorized("unauthorized"));
  }

  if (user.isAdmin) {
    userLevel = levels.ADMIN;
  } else if (user.verified) {
    userLevel = levels.LEVEL3;
  } else if (user.awaitingReview) {
    userLevel = levels.LEVEL2;
  } else {
    userLevel = levels.LEVEL1;
  }

  if (userLevel < minimumLevelValue) {
    return next(boom.unauthorized("unauthorized"));
  }
  return next();
};
