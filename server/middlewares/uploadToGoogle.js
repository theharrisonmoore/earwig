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
    let file;
    const newPath = req.file.path.replace("temp-", "");

    if (!isVoice) {
      const buffer = await sharp(req.file.path).resize(1024, 1024, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      }).toBuffer();

      await fs.writeFile(newPath, buffer);
      file = await bucket.upload(newPath, options);
    } else {
      file = await bucket.upload(req.file.path, options);
    }
    req.file.uploadedFileName = file[0].name;
    req.fieldName = fieldName;
    req.isVoice = isVoice;
    return next();
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
