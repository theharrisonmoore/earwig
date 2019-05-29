const boom = require("boom");

const { addNew, getOrganizationByName } = require("../database/queries/organizations/");

module.exports = async (req, res, next) => {
  const { name, category } = req.body;
  const foundOrg = await getOrganizationByName(name);
  if (foundOrg.length > 0) {
    next(boom.conflict("organisation already exists"));
  } else {
    addNew({ name, category })
      .then(addedOrg => res.json(addedOrg))
      .catch(() => next(boom.badImplementation()));
  }
};
