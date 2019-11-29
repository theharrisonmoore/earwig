const boom = require("boom");
const searchQuery = require("../database/queries/search");

module.exports = (req, res, next) => {
  const { category } = req.params;

  searchQuery(category)
    .then(result => res.json(result))
    .catch(err => next(boom.badImplementation(err)));
};
