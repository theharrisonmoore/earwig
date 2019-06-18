const boom = require("boom");
const { reviewed } = require("../database/queries/search");

module.exports = (req, res, next) => {
  reviewed()
    .then(result => res.json(result))
    .catch(() => next(boom.badImplementation()));
};
