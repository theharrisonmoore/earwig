const boom = require("@hapi/boom");
const searchQuery = require("../database/queries/search");

module.exports = (req, res, next) => {
  searchQuery()
    .then(result => res.json(result))
    .catch(() => next(boom.badImplementation()));
};
