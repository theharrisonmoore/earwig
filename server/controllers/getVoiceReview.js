// expects request from client for the audio file using the filename

const boom = require("boom");
const getFileLink = require("../helpers/getFileLink");

const voiceReview = async (req, res, next) => {
  try {
    const filename = req.body;

    console.log("file", filename);

    const link = await getFileLink(filename.filename);

    console.log("link", link);

    res.send({ audio: link });
  } catch (error) {
    next(boom.badImplementation());
  }
};

module.exports = voiceReview;
