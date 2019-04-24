const Organization = require("../../models/Organization");

module.exports.findByName = name => Organization.findOne({ name });

module.exports.addNew = ({ name, category }) => Organization.create({
  name,
  category,
  active: false,
});
