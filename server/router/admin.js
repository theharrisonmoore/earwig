const router = require("express").Router();

const getAllUsers = require("./../controllers/admin/allUsers");

router.get(
  "/users",
  getAllUsers,
);

module.exports = router;
