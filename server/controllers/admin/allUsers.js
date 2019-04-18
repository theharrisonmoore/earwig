const boom = require("boom");

const { getAllUsers } = require("./../../database/queries/user");

module.exports = ((req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.json(users);
    }).catch(() => {
      next(boom.badImplementation());
    });
});
