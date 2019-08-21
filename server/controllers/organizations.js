const boom = require("boom");

const { addNew, getOrganizationByName } = require("../database/queries/organizations/");
const emailAdminTheNewProfile = require("./../helpers/emails/emailAdminTheNewProfile");

const addNewOrg = async (req, res, next) => {
  const { user } = req;
  const { name, category } = req.body;
  // Todo: validate the name and category
  if (!name || !category) {
    next(boom.badRequest("Name is required"));
  }
  try {
    const foundOrg = await getOrganizationByName(name);
    console.log("foundOrg", foundOrg);
    if (foundOrg.length > 0) {
      next(boom.conflict("organisation already exists"));
    } else {
      const addedOrg = await addNew({ name, category });
      console.log("addedOrg", addedOrg);
      if (user.role !== "admin" && process.env.NODE_ENV === "production") {
        await emailAdminTheNewProfile(user, addedOrg);
      }
      res.json(addedOrg);
    }
  } catch (error) {
    console.log("err", error);
    next(boom.badImplementation(error));
  }
};

module.exports = addNewOrg;
