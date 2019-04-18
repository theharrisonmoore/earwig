const { deleteUser } = require("./../../database/queries/user");

module.exports = ((req, res) => {
  const { id } = req.body;
  deleteUser(id)
    .then((users) => {
      res.json(users);
    });
});
