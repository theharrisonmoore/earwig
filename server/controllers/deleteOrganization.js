const boom = require("@hapi/boom");

const { deleteOrganization, getOrganizationByName } = require("../database/queries/organizations");

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const name = req.params.id;
  const foundOrg = await getOrganizationByName(name);
  if (foundOrg.length > 0) {
    console.log("del found");
    deleteOrganization(name)
      .then(() => res.json({ success: "Organization successfully deleted" }))
      .catch(err => next(boom.badImplementation(err)));
  } else {
    console.log("del not found");
    next(boom.badRequest());
  }
};
