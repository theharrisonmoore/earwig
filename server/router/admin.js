const router = require("express").Router();

const getAllUsers = require("./../controllers/admin/allUsers");
const deleteUser = require("./../controllers/admin/deleteUser");
const userInfo = require("./../controllers/admin/userInfo");
const verifyUser = require("./../controllers/admin/verifyUser");
const rejectUser = require("./../controllers/admin/rejectUser");
const getOrganizations = require("./../controllers/admin/getOrganizations");
const activateOrganization = require("./../controllers/admin/activateOrganization");
const validation = require("./../middlewares/validation");

router.get(
  "/users",
  getAllUsers,
);

router.delete(
  "/users",
  validation("onlyMongoId"),
  deleteUser,
);

router.get(
  "/users/:id",
  userInfo,
);

router.patch(
  "/users/verify",
  validation("onlyMongoId"),
  verifyUser,
);

router.patch(
  "/users/reject",
  validation("onlyMongoId"),
  rejectUser,
);

router.get(
  "/organizations/:category",
  getOrganizations,
);

router.patch(
  "/organizations",
  validation("activateOrganization"),
  activateOrganization,
);

module.exports = router;
