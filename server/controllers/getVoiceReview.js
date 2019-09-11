// expects request from client for the audio file using the filename

const boom = require("boom");
const getFileLink = require("../helpers/getFileLink");

const voiceReview = async (req, res, next) => {
  try {
    const filename = req.body;

    const link = await getFileLink(filename.filename);

    res.send({ audio: link });
  } catch (error) {
    next(boom.badImplementation());
  }
};

module.exports = voiceReview;
