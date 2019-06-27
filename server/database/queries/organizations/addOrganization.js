const Organization = require("../../models/Organization");

module.exports.addNew = ({ name, category }) => Organization.create({
  name,
  category,
});

// function to add multiple orgs at once - expects an array of objects
module.exports.addOrgs = orgs => Organization.create(orgs);
