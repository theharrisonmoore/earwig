const searchQuery = require("../database/queries/search");

module.exports = (req, res, next) => {
  const searchTerm = "A A C Mechanical & Electrical";
  searchQuery(searchTerm)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch(err => console.log(err));
};
