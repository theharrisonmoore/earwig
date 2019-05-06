const boom = require("boom");

const { updateLastViewed } = require("../database/queries/organizations");

module.exports = (req, res, next) => {
  const { id } = req.body;
  console.log("ID", id)

  updateLastViewed(id)
    .then(result => res.json())
    .catch(err => next(boom.badImplementation()));
};
