const router = require("express").Router();
const upload = require("../middlewares/uploadFileToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");
const getTradesController = require("../controllers/getTrades");
const deleteFileFromServer = require("../middlewares/deleteFileFromServer");
const validation = require("./../middlewares/validation");
const loginController = require("./../controllers/login");

router.post(
  "/upload-verification-image",
  upload("verificationImage"),
  // validate(), validate the rq.body data
  toGoogle(),
  deleteFileFromServer,
  uploadVerificationImage,
);
// require all the routes in this file
router.post(
  "/login",
  validation("login"),
  loginController,
);

router.get(
  "/trades",
  getTradesController,
);


module.exports = router;
