const boom = require("boom");
const { updateOrgsById, getOrganizationByName } = require("./../../database/queries/organizations");

module.exports = (req, res, next) => {
  const { newOrgData } = req.body;
  // check if the new name is exist in DB
  getOrganizationByName(newOrgData.name).then(([org]) => {
    if (org && newOrgData.record.name !== newOrgData.name) {
      return next(boom.conflict(`${newOrgData.name} Already exists`));
    }
    return updateOrgsById(newOrgData._id || newOrgData.record._id, newOrgData)
      .then(() => {
        res.send(newOrgData);
      })
      .catch(() => {
        next(boom.badImplementation());
      });
  }).catch(() => {
    next(boom.badImplementation());
  });
};
