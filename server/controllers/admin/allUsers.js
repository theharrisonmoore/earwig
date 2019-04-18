const { getAllUsers } = require("./../../database/queries/user");

module.exports = ((req, res) => {
  getAllUsers({ isAdmin: false })
    .then((users) => {
      res.json(users);
    });
});
