const boom = require("boom");

const { createOrganization } = require("./organization.service");

const addNewOrg = async (req, res, next) => {
  const { user } = req;
  const { name, category } = req.body;
  // Todo: validate the name and category
  if (!name || !category) {
    next(boom.badRequest("Name is required"));
  }

  try {
    const addedOrg = await createOrganization({ name, category, user });

    return res.json(addedOrg);
  } catch (error) {
    if (error.message === "organisation already exists") {
      return next(boom.conflict(error.message));
    }
    return next(boom.badImplementation(error));
  }
};

module.exports = addNewOrg;
