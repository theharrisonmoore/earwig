const boom = require("boom");

const { deleteUserCompletely } = require("../database/queries/user");

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { user } = req;

  deleteUserCompletely(user.id)
    .then(() => res.json({ success: "User successfully deleted" }))
    .catch(() => next(boom.badImplementation()));
};
