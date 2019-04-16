const router = require("express").Router();
const { getByOrg, postReview } = require("../controllers/review");
const upload = require("../middlewares/uploadFileToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");
const getTradesController = require("../controllers/getTrades");
const deleteFileFromServer = require("../middlewares/deleteFileFromServer");
const validation = require("./../middlewares/validation");
const loginController = require("./../controllers/login");
const signupController = require("./../controllers/signup");
const postTradesController = require("../controllers/addTrade");

const uploadWorksiteController = require("../controllers/uploadWorksiteImage");


router.get("/questions", getByOrg);

router.post("/review", postReview);


// require all the routes in this file
router.post(
  "/login",
  validation("login"),
  loginController,
);

router.post(
  "/upload-verification-image",
  upload("verificationImage"),
  validation("uploadVerificationImage"),
  toGoogle(),
  deleteFileFromServer,
  uploadVerificationImage,
);

router.post(
  "/worksite-image",
  upload("worksiteImage"),
  toGoogle(),
  deleteFileFromServer,
  uploadWorksiteController,
);

router.get(
  "/trades",
  getTradesController,
);

router.post(
  "/trades",
  validation("addTrade"),
  postTradesController,
);

router.post(
  "/signup",
  validation("signup"),
  signupController,
);

module.exports = router;
