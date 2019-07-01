const boom = require("boom");
const { updateOrgsById } = require("./../../database/queries/organizations");

module.exports = (req, res, next) => {
  const { newOrgData } = req.body;

  updateOrgsById(newOrgData._id, newOrgData)
    .then(() => {
      res.send(newOrgData);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
