const Answer = require("./../../models/Answer");
const Review = require("./../../models/Review");
const Comment = require("./../../models/Comment");
const Organization = require("./../../models/Organization");


module.exports.transferReviews = ({ oldOrg, newOrg }) => Review.updateMany(
  { organization: oldOrg }, // filter
  { organization: newOrg }, // update data
);

module.exports.transferComments = ({ oldOrg, newOrg }) => Comment.updateMany(
  { organization: oldOrg }, // filter
  { organization: newOrg }, // update data
);

module.exports.transferAnswers = ({ oldOrg, newOrg }) => Answer.updateMany(
  { organization: oldOrg }, // filter
  { organization: newOrg }, // update data
);

module.exports.deleteOrganisationById = id => Organization.deleteOne({ _id: id });
