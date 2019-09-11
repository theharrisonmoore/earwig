const boom = require("boom");

const { updateLastViewed } = require("../database/queries/organizations");

module.exports = (req, res, next) => {
  const { id } = req.body;

  updateLastViewed(id)
    .then(() => res.json())
    .catch(() => next(boom.badImplementation()));
};
