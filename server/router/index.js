const router = require("express").Router();
const validation = require("./../middlewares/validation");

const searchController = require("../controllers/search");

// require all the routes in this file
router.post("/login", validation("login"), loginController);

router.get("/search", searchController);
const loginController = require("./../controllers/login");

module.exports = router;
