const boom = require("boom");

const { admin } = require("../config");


/**
 * function returns a middleware
 * that upload the file to Google storage
 */

module.exports = (required, isVoice) => async (req, res, next) => {
  if (!req.file) {
    if (required) {
      return next(boom.badImplementation());
    }
    return next();
  }

  try {
    const bucket = admin.storage().bucket();


    const options = {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
    };

    if (isVoice) {
      options.metadata = {
        contentType: "application/octet-stream",
      };
    }

    const [file] = await bucket.upload(req.file.path, options);
    req.file.uploadedFileName = file.name;
  } catch (error) {
    next(boom.badImplementation("Error while uploading photo"));
  }

  return next();
};
