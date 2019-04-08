const router = require("express").Router();
const loginController = require("./../controllers/login");

// require all the routes in this file
router.post("/login", loginController);
module.exports = router;
