const admin = require("firebase-admin");
const { cred, storageBucket } = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(cred),
  storageBucket,
});

/**
 * function returns a middleware
 * that upload the file to Google storage
 */

module.exports = () => async (req, res, next) => {
  if (!req.file) {
    return next("error");
  }
  const bucket = admin.storage().bucket();

  const [file] = await bucket.upload(req.file.path, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
  });
  req.file.uploadedFileName = file.name;

  return next();
};
