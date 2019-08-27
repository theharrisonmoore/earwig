const boom = require("boom");

module.exports = async (req, res) => {
  console.log("voice", req.file, req.body);
  if (!req.file && !req.file.uploadedFileName) {
    return boom.badImplementation();
  }
  console.log("req.file", req.file);
  const { uploadedFileName } = req.file;
  return res.send({ audio: uploadedFileName });
};
