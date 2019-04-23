const router = require("express").Router();

const validation = require("./../middlewares/validation");
const getAllUsers = require("./../controllers/admin/allUsers");
const deleteUser = require("./../controllers/admin/deleteUser");
const userInfo = require("./../controllers/admin/userInfo");
const verifyUser = require("./../controllers/admin/verifyUser");
const rejectUser = require("./../controllers/admin/rejectUser");
const getReviews = require("./../controllers/admin/getReviews");
const deleteReview = require("./../controllers/admin/deleteReview");

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

router.patch(
  "/users/verify",
  verifyUser,
);

router.patch(
  "/users/reject",
  rejectUser,
);

router.get(
  "/reviews",
  getReviews,
);

router.delete(
  "/reviews",
  validation("onlyMongoId"),
  deleteReview,
);

module.exports = router;
