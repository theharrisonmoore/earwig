const router = require("express").Router();
const upload = require("../middlewares/uploadFileToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");
const getTradesController = require("../controllers/getTrades");
const deleteFileFromServer = require("../middlewares/deleteFileFromServer");

router.post(
  "/upload-verification-image",
  upload("avatar"),
  // validate(), validate the rq.body data
  toGoogle(),
  deleteFileFromServer,
  uploadVerificationImage,
);

router.get(
  "/trades",
  getTradesController,
);


module.exports = router;
