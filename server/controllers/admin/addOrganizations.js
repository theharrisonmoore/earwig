const boom = require("boom");

const { addOrgs } = require("../../database/queries/organizations/addOrganization");
const { getOrganizationByName } = require("../../database/queries/organizations");

module.exports = (req, res, next) => {
  const { newOrgs } = req.body;
  getOrganizationByName(newOrgs.name).then(([org]) => {
    if (org) {
      return next(boom.conflict(`${newOrgs.name} Already exists`));
    }
    return addOrgs(newOrgs)
      .then(() => {
        res.send("Successfully added");
      })
      .catch(() => {
        next(boom.badImplementation());
      });
  }).catch(() => {
    next(boom.badImplementation());
  });
};
