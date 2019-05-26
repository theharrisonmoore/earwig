const boom = require("boom");

const { deleteOrganization } = require("../database/queries/organizations");

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const name = req.params.id;
  deleteOrganization(name)
    .then(() => res.json({ success: "Organization successfully deleted" }))
    .catch(err => next(boom.badImplementation(err)));
};
