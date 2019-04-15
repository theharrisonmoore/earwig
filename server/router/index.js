const router = require("express").Router();
const upload = require("../middlewares/uploadFileToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");
const getTradesController = require("../controllers/getTrades");
const deleteFileFromServer = require("../middlewares/deleteFileFromServer");
const validation = require("./../middlewares/validation");
const loginController = require("./../controllers/login");
const signupController = require("./../controllers/signup");
const postTradesController = require("../controllers/addTrade");
const searchController = require("../controllers/search");

// require all the routes in this file
router.post("/login", validation("login"), loginController);

router.post(
  "/upload-verification-image",
  upload("verificationImage"),
  validation("uploadVerificationImage"),
  toGoogle(),
  deleteFileFromServer,
  uploadVerificationImage,
);

router.get("/trades", getTradesController);

router.get("/search", searchController);

router.post("/trades", validation("addTrade"), postTradesController);

router.post("/signup", validation("signup"), signupController);

module.exports = router;
