/**
 * allow admin to delete user by id
 * @param {id} mongoID - user id
 */

const boom = require("boom");
const { deleteUser } = require("./../../database/queries/user");

module.exports = ((req, res, next) => {
  const { id } = req.body;
  deleteUser(id)
    .then(({ deletedCount }) => {
      if (deletedCount > 0) {
        res.json();
      } else {
        next(boom.methodNotAllowed("can not be deleted!"));
      }
    }).catch(() => {
      next(boom.badImplementation());
    });
});
