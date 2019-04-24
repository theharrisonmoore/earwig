const Organization = require("./../../models/Organization");
const getOrgsByCategory = require("./getOrgsByCategory");
const { addNew, findByName } = require("./addOrganization");

module.exports.getOrgsByCategory = getOrgsByCategory;

module.exports.deleteOrganization = id => Organization.deleteOne({ _id: id });

module.exports.getOrganizationById = id => Organization.findById(id);

module.exports.updateOrgsById = (id, data) => Organization.findByIdAndUpdate(id, { $set: data });

module.exports.addNew = addNew;

module.exports.findByName = findByName;
