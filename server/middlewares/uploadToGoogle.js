const boom = require("boom");
const sharp = require("sharp");

const fs = require("fs").promises;
const { admin } = require("../config");

/**
 * function returns a middleware
 * that upload the file to Google storage
 */

module.exports = (required, isVoice, fieldName) => async (req, res, next) => {
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

    const { size } = req.file;

    if (isVoice) {
      options.metadata = {
        contentType: "application/octet-stream",
        acceptRanges: "bytes",
        contentLength: size,
        contentRange: `bytes 0-${size - 1}/${size}`,
      };
    }

    const newPath = req.file.path.replace("temp-", "");

    return sharp(req.file.path).resize(1024, 1024, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    }).toBuffer(async (err, buffer) => {
      await fs.writeFile(newPath, buffer);

      const [file] = await bucket.upload(newPath, options);
      req.file.uploadedFileName = file.name;
      req.fieldName = fieldName;
      return next();
    });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
