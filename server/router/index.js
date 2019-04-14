const router = require("express").Router();
const { getByOrg, postReview } = require("../controllers/review");
const validation = require("./../middlewares/validation");
const loginController = require("./../controllers/login");
const signupController = require("./../controllers/signup");


router.get("/questions", getByOrg);

router.post("/review", postReview);


// require all the routes in this file
router.post(
  "/login",
  validation("login"),
  loginController,
);

router.post(
  "/signup",
  validation("signup"),
  signupController,
);

module.exports = router;
