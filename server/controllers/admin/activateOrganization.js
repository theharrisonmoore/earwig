/**
 * activate / deactivate organization by id
 * @param {id} - mongoID - organization id
 * @param {active} - boolean - true => activate, false => deactivate
 */

const boom = require("boom");
const { updateOrgsById, getOrganizationById } = require("./../../database/queries/organizations");

module.exports = ((req, res, next) => {
  const { id, active } = req.body;
  getOrganizationById(id)
    .then((organization) => {
      if (!organization) {
        next(boom.notFound("organization not found!"));
      } else {
        updateOrgsById(id, { active })
          .then(() => {
            res.json();
          }).catch(() => {
            next(boom.badImplementation());
          });
      }
    });
});
