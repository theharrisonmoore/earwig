const router = require("express").Router();
const upload = require("../middlewares/uploadImageToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");
const getTradesController = require("../controllers/getTrades");

router.post(
  "/upload-verification-image",
  upload("avatar"),
  // validate(), validate the rq.body data
  toGoogle(),
  uploadVerificationImage,
);

router.get(
  "/trades",
  getTradesController,
);


module.exports = router;
