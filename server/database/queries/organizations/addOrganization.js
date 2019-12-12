const Organization = require("../../models/Organization");

module.exports.addNew = ({ name, category, userId }) => Organization.create({
  name,
  category,
  createdBy: userId,
});

// function to add multiple orgs at once - expects an array of objects
module.exports.addOrgs = orgs => Organization.create(orgs);
