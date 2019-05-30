/**
 * get all workers info
 * to be rendered in a table for the admin
 */

const boom = require("@hapi/boom");

const { getAllUsers } = require("./../../database/queries/user");

module.exports = ((req, res, next) => {
  const awaitingReview = req.query.awaitingReview === "true";

  getAllUsers(awaitingReview)
    .then((users) => {
      res.json(users);
    }).catch(() => {
      next(boom.badImplementation());
    });
});
