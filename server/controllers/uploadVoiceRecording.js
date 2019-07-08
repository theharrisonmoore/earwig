const boom = require("boom");

module.exports = async (req, res) => {
  if (!req.file && !req.file.uploadedFileName) {
    return boom.badImplementation();
  }
  const { uploadedFileName } = req.file;
  return res.send({ audio: uploadedFileName });
};
