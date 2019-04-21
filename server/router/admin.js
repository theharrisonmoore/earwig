const router = require("express").Router();

const getAllUsers = require("./../controllers/admin/allUsers");
const deleteUser = require("./../controllers/admin/deleteUser");
const userInfo = require("./../controllers/admin/userInfo");
const verifyUser = require("./../controllers/admin/verifyUser");

router.get(
  "/users",
  getAllUsers,
);

router.delete(
  "/users",
  deleteUser,
);

router.get(
  "/users/:id",
  userInfo,
);

router.get(
  "/users/verify/:id",
  verifyUser,
);

module.exports = router;
