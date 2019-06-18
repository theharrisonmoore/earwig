const boom = require("boom");

const { addNew, getOrganizationByName } = require("../database/queries/organizations/");
const emailAdminTheNewProfile = require("./../helpers/emailAdminTheNewProfile");

module.exports = async (req, res, next) => {
  const { user } = req;
  const { name, category } = req.body;
  try {
    const foundOrg = await getOrganizationByName(name);
    if (foundOrg.length > 0) {
      next(boom.conflict("organisation already exists"));
    } else {
      const addedOrg = await addNew({ name, category });
      if (user.role !== "admin") {
        await emailAdminTheNewProfile(user, addedOrg);
      }
      res.json(addedOrg);
    }
  } catch (error) {
    next(boom.badImplementation());
  }
};
