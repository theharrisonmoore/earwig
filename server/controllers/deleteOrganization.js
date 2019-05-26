const boom = require("boom");

const { deleteOrganization } = require("../database/queries/organizations");

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  console.log("hello");
  const { id } = req;
  deleteOrganization(id)
    .then(() => res.json({ success: "Organization successfully deleted" }))
    .catch(err => next(boom.badImplementation(err)));
};
