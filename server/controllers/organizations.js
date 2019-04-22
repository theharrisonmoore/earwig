const boom = require("boom");

const { findByName, addNew } = require("../database/queries/organization");

module.exports = (req, res, next) => {
  const { name, category, verified } = req.body;
  findByName(name)
    .then((org) => {
      if (org) {
        next(boom.badImplementation("organisation already exists"));
      } else {
        return addNew({ name, category, verified }).then(addedOrg => res.json(addedOrg));
      }
    })
    .catch(err => next(boom.badImplementation()));
};
