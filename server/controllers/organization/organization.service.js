const { addNew, getOrganizationByName } = require("../../database/queries/organizations/");

const createOrganization = async ({ name, category }) => {
  const foundOrg = await getOrganizationByName(name);
  if (foundOrg.length > 0) {
    throw new Error("organisation already exists");
  } else {
    const addedOrg = addNew({ name, category });

    return addedOrg;
  }
};

module.exports = {
  createOrganization,
};
