const boom = require("@hapi/boom");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  return fs.unlink(filePath, (err) => {
    if (err) return next(boom.badImplementation("Error while uploading photo"));
    return next();
  });
};
