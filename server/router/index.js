const router = require("express").Router();
const reviewController = require("../controllers/review");


router.get("/questions", reviewController);

module.exports = router;
