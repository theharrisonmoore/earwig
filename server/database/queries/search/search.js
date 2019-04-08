const Organizations = require("../../models/Organization");
const Reviews = require("../../models/Review");

module.exports = userinput => new Promise((resolve, reject) => {
  // Organizations.aggregate([]);
  resolve(userinput.toString());
});
