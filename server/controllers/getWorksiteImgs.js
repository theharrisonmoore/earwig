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

      // get the orientation
      const imgArr = img.split(".");
      const orientName = imgArr[imgArr.length - 2];
      const orientation = orientName.split("orient:")[1].split("-")[0];

      const imgObj = { link, orientation };

      links.push(imgObj);

    }

    res.send({ images: links });
  } catch (error) {
    next(boom.badImplementation());
  }
};

module.exports = worksiteImgs;
