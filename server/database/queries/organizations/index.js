const Organization = require("./../../models/Organization");
const getOrgsByCategory = require("./getOrgsByCategory");

module.exports.getOrgsByCategory = getOrgsByCategory;

module.exports.deleteOrganization = id => Organization.deleteOne({ _id: id });

module.exports.getOrganizationById = id => Organization.findById(id);

module.exports.updateOrgsById = (id, data) => Organization.findByIdAndUpdate(id, { $set: data });
