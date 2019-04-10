const router = require("express").Router();

const profileController = require("./../controllers/profile");

// require all the routes in this file
router.post("/profile", profileController);

module.exports = router;
