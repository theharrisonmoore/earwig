const Review = require("./../../models/Review");
const Organization = require("./../../models/Organization");

module.exports.organizationDetails = organizationID => Organization.findById(organizationID);

module.exports.totalReviews = organizationID => new Promise((resolve, reject) => {
  Review.find({ organization: organizationID })
    .then(resolve)
    .catch(err => reject(err));

  // get number of reviews
  // get average overall rating
  // get organisation name
  // get organisation type
  // get organisation number, email, website
  // get overall review
  // get siteImages
});
