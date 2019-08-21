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
      const { size } = req.file;
      options.metadata = {
        contentType: "application/octet-stream",
        acceptRanges: "bytes",
        contentLength: size,
        contentRange: `bytes 0-${size - 1}/${size}`,
      };
    }
    const [file] = await bucket.upload(req.file.path, options);
    req.file.uploadedFileName = file.name;
    return next();
  } catch (error) {
    next(boom.badImplementation("Error while uploading photo"));
  }
};
