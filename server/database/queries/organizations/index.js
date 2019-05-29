const Organization = require("./../../models/Organization");
const getOrgsByCategory = require("./getOrgsByCategory");
const { addNew } = require("./addOrganization");

module.exports.getOrgsByCategory = getOrgsByCategory;

module.exports.deleteOrganization = async (name) => {
  const deletedOrg = await Organization.deleteOne({ name });
  return deletedOrg;
};

module.exports.getOrganizationByName = (name) => {
  const regex = new RegExp(["^", name, "$"].join(""), "i");
  return Organization.find({ name: regex });
};

module.exports.getOrganizationById = id => Organization.findById(id);

module.exports.updateOrgsById = (id, data) => Organization.findByIdAndUpdate(id, { $set: data });

module.exports.updateLastViewed = id => Organization.findByIdAndUpdate(id,
  { lastViewed: Date.now() });

module.exports.addNew = addNew;
