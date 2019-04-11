const router = require("express").Router();
const validation = require("./../middlewares/validation");

const loginController = require("./../controllers/login");

// require all the routes in this file
router.post("/login", validation("login"), loginController);
module.exports = router;
