const boom = require("boom");

const { addNew, getOrganizationByName } = require("../database/queries/organizations/");

module.exports = async (req, res, next) => {
  const { name, category } = req.body;
  const foundOrg = await getOrganizationByName(name);
  if (foundOrg.length > 0) {
    next(boom.badRequest("organisation already exist"));
  } else {
    addNew({ name, category })
      .then(addedOrg => res.json(addedOrg))
      .catch(err => next(boom.badImplementation()));
  }
};
