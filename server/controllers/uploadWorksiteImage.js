const boom = require("@hapi/boom");

module.exports = async (req, res, next) => {
  if (!req.file && !req.file.uploadedFileName) {
    return boom.badImplementation();
  }
  const { uploadedFileName } = req.file;
  res.send({ image: uploadedFileName });
};
