const router = require("express").Router();

const controllers = require("./controllers");

router.use(controllers);

module.exports = router;
