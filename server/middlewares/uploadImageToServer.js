const multer = require("multer");
/**
 * upload function that return a multer middleware
 * @param { String }  fieldName - the request field name that contain the file
 */

module.exports = fieldName => (req, res, next) => {
  // storage config
  const storage = multer.diskStorage({
    destination(destinationReq, file, cb) {
      cb(null, "uploads/");
    },
    filename(fileReq, file, cb) {
      const extention = file.originalname.split(".")[file.originalname.split(".").length - 1];
      const fileName = file.originalname.split(".")[0];
      cb(null, `${fileName}-${Date.now()}.${extention}`);
    },
  });

  const upload = multer({ storage }).single(fieldName);

  upload(req, res, (err) => {
    console.log(err);

    if (err) { return next("Error in uploading photo"); }
    return next();
  });
};
