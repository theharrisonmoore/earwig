const express = require("express");

const router = express.Router();

const testHello = require("./hello");

router.get("/hi", testHello);

module.exports = router;
