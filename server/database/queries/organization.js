const Organization = require("./../models/Organization");

module.exports.findByName = name => Organization.findOne({ name });

module.exports.addNew = ({ name, category, verified }) => Organization.create({
  name,
  category,
  verified,
});
