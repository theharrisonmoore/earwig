const searchQuery = require("../database/queries/search/search");

module.exports = (req, res, next) => {
  console.log("reached");

  const searchTerm = "anything";
  searchQuery(searchTerm)
    .then((result) => {
      res.json(result);
    })
    .catch(() => console.warn("err"));
};
