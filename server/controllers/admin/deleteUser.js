/**
 * allow admin to delete user by id
 * @param {id} mongoID - user id
 */

const boom = require("@hapi/boom");
const { deleteUserCompletely } = require("./../../database/queries/user");

module.exports = (req, res, next) => {
  const { id } = req.body;
  deleteUserCompletely(id)
    .then(() => res.json({ success: "User successfully deleted" }))
    .catch(err => next(boom.badImplementation(err)));
};
