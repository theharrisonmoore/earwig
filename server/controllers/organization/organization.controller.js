const boom = require("boom");

const emailAdminTheNewProfile = require("../../helpers/emails/emailAdminTheNewProfile");
const { createOrganization } = require("./organization.service");

const addNewOrg = async (req, res, next) => {
  const { user } = req;
  const { name, category } = req.body;
  // Todo: validate the name and category
  if (!name || !category) {
    next(boom.badRequest("Name is required"));
  }

  try {
    const addedOrg = createOrganization({ name, category });
    if (user.role !== "admin" && process.env.NODE_ENV === "production") {
      await emailAdminTheNewProfile(user, addedOrg);
    }
    res.json(addedOrg);
  } catch (error) {
    if (error.message === "organisation already exists") {
      return next(boom.conflict(error.message));
    }
    return next(boom.badImplementation(error));
  }
};

module.exports = addNewOrg;
