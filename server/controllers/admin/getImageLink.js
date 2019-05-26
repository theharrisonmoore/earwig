const boom = require("boom");
const getFileLink = require("./../../helpers/getFileLink");

module.exports = (req, res, next) => {
  const { name } = req.params;

  getFileLink(name)
    .then((url) => {
      if (url) {
        res.json({ url });
      } else {
        next(boom.notFound("File Not Found"));
      }
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
