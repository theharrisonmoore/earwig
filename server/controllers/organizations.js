const boom = require("boom");

const { addNew } = require("../database/queries/organizations/addOrganization");

module.exports = (req, res, next) => {
  const { name, category, verified } = req.body;
  addNew({ name, category, verified })
    .then(addedOrg => res.json(addedOrg))
    .catch(err => next(boom.badImplementation()));
};
