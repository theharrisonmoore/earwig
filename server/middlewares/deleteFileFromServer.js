
const fs = require("fs");

module.exports = (req, res, next) => {
  const filePath = req.file.path;
  fs.unlink(filePath, (err) => {
    if (err) return next("error in deleteing the file");
    return next();
  });
};
