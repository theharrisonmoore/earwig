const boom = require("boom");

const { getOrgsByCategory } = require("./../../database/queries/organizations.js");

module.exports = ((req, res, next) => {
  const { category } = req.params;
  getOrgsByCategory(category)
    .then((organizations) => {
      res.json(organizations);
    }).catch(() => {
      next(boom.badImplementation());
    });
});
