const boom = require("boom");
const { updateOrgsById, getOrganizationById } = require("./../../database/queries/organizations");

module.exports = ((req, res, next) => {
  const { id } = req.body;
  getOrganizationById(id)
    .then((organization) => {
      if (!organization) {
        next(boom.notFound("organization not found!"));
      } else {
        updateOrgsById(id, { active: false })
          .then(() => {
            res.json();
          }).catch(() => {
            next(boom.badImplementation());
          });
      }
    });
});
