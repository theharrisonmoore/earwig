/**
 * allow admin to delete user by id
 * @param {id} mongoID - user id
 */

const boom = require("boom");
const { deleteUserCompletely, getUserById, deleteUserCompletelyWithProfiles } = require("./../../database/queries/user");

module.exports = async (req, res, next) => {
  const { id } = req.body;
  try {
    const user = await getUserById(id);
    if (!user) {
      return next(boom.notFound("User not found"));
    }
    // COMMENTED_VERIFICATION_CHECK
    // if (!user.verified) {
    //   await deleteUserCompletelyWithProfiles(id);
    // } else {
    //   await deleteUserCompletely(id);
    // }

    await deleteUserCompletely(id);

    return res.json({ success: "User successfully deleted" });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
