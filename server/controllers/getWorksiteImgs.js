const boom = require("boom");
const getImageLink = require("../helpers/getFileLink");

// get a list of the worksite images to be rendered in the slider
const worksiteImgs = async (req, res, next) => {
  try {
    const images = req.body; // list of images names
    const links = []; // an array of the images urls
    // eslint-disable-next-line no-restricted-syntax
    for (const img of images) {
      // loop over the images names and fetch each on from google storage
      // eslint-disable-next-line no-await-in-loop
      const link = await getImageLink(img);
      links.push(link);
    }

    res.send({ images: links });
  } catch (error) {
    next(boom.badImplementation());
  }
};

module.exports = worksiteImgs;
