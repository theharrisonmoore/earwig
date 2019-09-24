const boom = require("boom");

module.exports = async (req, res) => {
  try {
    if (!req.file && !req.file.uploadedFileName) {
      return boom.badImplementation();
    }
    const { uploadedFileName } = req.file;
    console.log("up", req.file);
    return res.send({ image: uploadedFileName });
  } catch (error) {
    return boom.badImplementation();
  }
};
