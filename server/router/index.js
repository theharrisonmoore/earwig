const router = require("express").Router();

// require all the routes in this file
const searchController = require("../controllers/search");

router.get("/search", searchController);

module.exports = router;
