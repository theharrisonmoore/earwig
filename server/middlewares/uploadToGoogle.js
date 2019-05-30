const boom = require("@hapi/boom");

const { admin } = require("../config");


/**
 * function returns a middleware
 * that upload the file to Google storage
 */

module.exports = required => async (req, res, next) => {
  if (!req.file) {
    if (required) {
      return next(boom.badImplementation());
    }
    return next();
  }

  try {
    const bucket = admin.storage().bucket();
    const [file] = await bucket.upload(req.file.path, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
    });
    req.file.uploadedFileName = file.name;
  } catch (error) {
    next(boom.badImplementation("Error while uploading photo"));
  }

  return next();
};
