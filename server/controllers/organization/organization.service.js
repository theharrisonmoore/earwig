const { addNew, getOrganizationByName } = require("../../database/queries/organizations/");

const createOrganization = async ({ name, category, userId }) => {
  const foundOrg = await getOrganizationByName(name);
  if (foundOrg.length > 0) {
    throw new Error("organisation already exists");
  } else {
    const addedOrg = await addNew({ name, category, userId });

    return addedOrg;
  }
};

module.exports = {
  createOrganization,
};
