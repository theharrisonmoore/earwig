const { addNew, getOrganizationByName } = require("../../database/queries/organizations/");
const sendEmail = require("../../helpers/emails");

const createOrganization = async ({ name, category, user }) => {
  const foundOrg = await getOrganizationByName(name);
  if (foundOrg.length > 0) {
    throw new Error("organisation already exists");
  } else {
    const addedOrg = await addNew({ name, category, userId: user._id });
    await sendEmail.newEntityAdded(user, addedOrg);
    return addedOrg;
  }
};

module.exports = {
  createOrganization,
};
