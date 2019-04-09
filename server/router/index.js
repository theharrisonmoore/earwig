const router = require("express").Router();
const validation = require("./../middlewares/validation");

const loginController = require("./../controllers/login");
const signupController = require("./../controllers/signup");

// require all the routes in this file
router.post("/login",
  validation("login"),
  loginController);

router.post("/signup",
  // validation("signup"),
  signupController);

module.exports = router;
