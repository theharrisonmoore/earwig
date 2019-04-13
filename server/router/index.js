const router = require("express").Router();
const { getByOrg, postReview } = require("../controllers/review");


router.get("/questions", getByOrg);

router.post("/review", postReview);

module.exports = router;
