const router = require("express").Router();

const getAllUsers = require("./../controllers/admin/allUsers");
const deleteUser = require("./../controllers/admin/deleteUser");

router.get(
  "/users",
  getAllUsers,
);

router.delete(
  "/users",
  deleteUser,
);

module.exports = router;
