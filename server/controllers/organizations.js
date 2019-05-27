const boom = require("boom");

const { addNew, getOrganizationByName } = require("../database/queries/organizations/");

module.exports = async (req, res, next) => {
  const { name, category } = req.body;
  const foundOrg = await getOrganizationByName(name);
  if (foundOrg.length > 0) {
    console.log("add found");
    next(boom.conflict("organisation exists already"));
  } else {
    console.log("add not found");
    addNew({ name, category })
      .then(addedOrg => res.json(addedOrg))
      .catch(err => next(boom.badImplementation()));
  }
};
