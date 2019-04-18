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
const userInfoController = require("../controllers/userInfo");

const authentication = require("./../middlewares/authentication");
const softAuthCheck = require("./../middlewares/softAuthCheck");

const uploadWorksiteController = require("../controllers/uploadWorksiteImage");

const {
  LOGIN_URL,
  GET_QUESTIONS_URL,
  REVIEW_URL,
  UPLOAD_WORKSITE_IMAGE_URL,
} = require("../../client/src/apiUrls");

router.get(GET_QUESTIONS_URL, getByOrg);

router.post(REVIEW_URL, postReview);

const profileController = require("./../controllers/profile");
const commentsController = require("./../controllers/comments");

// require all the routes in this file
router.post("/profile", softAuthCheck, profileController);

router.post("/comments", commentsController);

router.post(LOGIN_URL, validation("login"), loginController);

router.get("/user", authentication, userInfoController);

router.post(
  "/upload-verification-image",
  upload("verificationImage"),
  validation("uploadVerificationImage"),
  toGoogle(),
  deleteFileFromServer,
  uploadVerificationImage,
);

router.post(
  UPLOAD_WORKSITE_IMAGE_URL,
  upload("worksiteImage"),
  toGoogle(),
  deleteFileFromServer,
  uploadWorksiteController,
);

router.get("/trades", getTradesController);

router.post("/trades", validation("addTrade"), postTradesController);

router.post("/signup", validation("signup"), signupController);

module.exports = router;
