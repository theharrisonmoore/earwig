const searchQuery = require("../database/queries/search");

module.exports = (req, res, next) => {
  // const searchTerm = "Abbey Builders";
  searchQuery()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch(err => console.log(err));
};
