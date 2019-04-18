const { getAllUsers } = require("./../../database/queries/user");

module.exports = ((req, res) => {
  getAllUsers()
    .then((users) => {
      res.json(users);
    });
});
