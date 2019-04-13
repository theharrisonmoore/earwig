const router = require("express").Router();
const { getByOrg, postReview } = require("../controllers/review");
const validation = require("./../middlewares/validation");
const loginController = require("./../controllers/login");


router.get("/questions", getByOrg);

router.post("/review", postReview);


// require all the routes in this file
router.post("/login", validation("login"), loginController);
module.exports = router;
