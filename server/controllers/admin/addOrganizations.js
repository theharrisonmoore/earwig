const boom = require("boom");

const { addOrgs } = require("../../database/queries/organizations/addOrganization");

module.exports = (req, res, next) => {
  const { newOrgs } = req.body;
  addOrgs(newOrgs)
    .then(() => {
      res.send("Successfully added");
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
