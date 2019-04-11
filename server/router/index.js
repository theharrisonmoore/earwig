const router = require("express").Router();
const upload = require("../middlewares/uploadImageToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");

router.post(
  "/upload-verification-image",
  upload("avatar"),
  // validate(), validate the rq.body data
  toGoogle(),
  uploadVerificationImage,
);

module.exports = router;
