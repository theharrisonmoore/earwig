const boom = require("boom");
const {
  updateOrgsById,
  getOrganizationByName
} = require("./../../database/queries/organizations");

module.exports = (req, res, next) => {
  const { newOrgData } = req.body;
  // check if the new name already exists in DB for another organisation
  getOrganizationByName(newOrgData.name)
    .then(([org]) => {
      if (
        org &&
        org.name !== newOrgData.name &&
        String(org._id) !== newOrgData._id
      ) {
        return next(boom.conflict(`${newOrgData.name} Already exists`));
      }
      return updateOrgsById(newOrgData._id || newOrgData.record._id, newOrgData)
        .then(() => {
          res.send(newOrgData);
        })
        .catch(() => {
          next(boom.badImplementation());
        });
    })
    .catch(err => {
      next(boom.badImplementation(err));
    });
};
