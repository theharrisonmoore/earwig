const boom = require("boom");
const searchQuery = require("../database/queries/search");

module.exports = (req, res, next) => {
  const { searchTerm } = req.body;
  searchQuery(searchTerm)
    .then(result => res.json(result))
    .catch(() => next(boom.badImplementation()));
};
