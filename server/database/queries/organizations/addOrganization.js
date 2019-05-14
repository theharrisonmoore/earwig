const Organization = require("../../models/Organization");

module.exports.addNew = ({ name, category }) => Organization.create({
  name,
  category,
  active: false,
});
