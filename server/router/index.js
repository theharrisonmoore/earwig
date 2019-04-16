const router = require("express").Router();
const upload = require("../middlewares/uploadFileToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");
const getTradesController = require("../controllers/getTrades");
const deleteFileFromServer = require("../middlewares/deleteFileFromServer");
const validation = require("./../middlewares/validation");
const loginController = require("./../controllers/login");
const signupController = require("./../controllers/signup");
const editProfile = require("./../controllers/editProfile");
const postTradesController = require("../controllers/addTrade");
const authentication = require("../middlewares/authentication");

// require all the routes in this file
router.post(
  "/login",
  validation("login"),
  loginController,
);

router.post(
  "/test",
  authentication,
  (req, res) => {
    console.log(req.user);
  },
);

router.post(
  "/upload-verification-image",
  upload("verificationImage"),
  validation("uploadVerificationImage"),
  toGoogle(true),
  deleteFileFromServer,
  uploadVerificationImage,
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

router.post(
  "/edit-profile",
  upload("verificationImage"),
  validation("editProfile"),
  toGoogle(false),
  deleteFileFromServer,
  editProfile,
);

module.exports = router;
