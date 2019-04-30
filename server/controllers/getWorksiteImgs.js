const boom = require("boom");
const getImageLink = require("../helpers/getFileLink");

const worksiteImgs = async (req, res, next) => {
  try {
    const images = req.body;
    const links = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const img of images) {
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
