const router = require("express").Router();

const validation = require("./../middlewares/validation");
const getAllUsers = require("./../controllers/admin/allUsers");
const deleteUser = require("./../controllers/admin/deleteUser");
const userInfo = require("./../controllers/admin/userInfo");
const verifyUser = require("./../controllers/admin/verifyUser");
const rejectUser = require("./../controllers/admin/rejectUser");
const getReviews = require("./../controllers/admin/getReviews");
const deleteReview = require("./../controllers/admin/deleteReview");
const deleteReviewAnswer = require("./../controllers/admin/deleteReviewAnswer");

const updateReview = require("./../controllers/admin/handleSingleReviewStatus");
const getSingleReview = require("./../controllers/admin/getSingleReview");
const getOrganizations = require("./../controllers/admin/getOrganizations");
const activateOrganization = require("./../controllers/admin/activateOrganization");
const getImageLink = require("./../controllers/admin/getImageLink");
const addOrganizations = require("./../controllers/admin/addOrganizations");
const editOrganization = require("./../controllers/admin/editOrganization");
const mergeOrgsProfiles = require("./../controllers/admin/mergeOrgsProfiles");

const {
  getAllTrades,
  deleteTradeController,
  addTradeController,
  editTradeController,
} = require("../controllers/admin/trades");

// get all workers info
router.get("/users", getAllUsers);

// delete worker by id
router.delete("/users", validation("onlyMongoId"), deleteUser);

// get user info (including the verification image)
// for awaiting review users
router.get("/users/:id", userInfo);

// verify user by id
router.patch("/users/verify", validation("onlyMongoId"), verifyUser);

// reject user by id
router.patch("/users/reject", validation("onlyMongoId"), rejectUser);

// get all reviews details to be rendered for the admin
router.get("/reviews", getReviews);

router.get("/single-review/:reviewID", getSingleReview);

// delete specific review by id
router.delete("/reviews", validation("onlyMongoId"), deleteReview);

router.delete("/reviews/delete-answer/:id", deleteReviewAnswer);

router.patch("/reviews/update-status", updateReview);

// get all organizations by category
router.get("/organizations/:category", getOrganizations);

// update organization state (activate/ deactivate)
router.patch("/organizations", validation("activateOrganization"), activateOrganization);

router.get("/trades", getAllTrades);

router.delete("/trades/:id", deleteTradeController);

router.post("/trades/add", addTradeController);

router.post("/trades/edit", editTradeController);

router.post("/organizations/add", addOrganizations);

router.post("/organizations/edit", editOrganization);

// get image url
router.get("/images/:name", getImageLink);

router.put("/organisations/merge", mergeOrgsProfiles);

module.exports = router;
