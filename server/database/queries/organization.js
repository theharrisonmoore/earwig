const Organization = require("./../models/Organization");

// module.exports.findByName = name => Organization.findOne({ name: name.toLowerCase() });

module.exports.addNew = ({ name, category, verified }) => Organization.create({
  name,
  category,
  verified,
});
