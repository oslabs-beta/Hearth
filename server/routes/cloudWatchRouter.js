const express = require('express');
// REQUIRE CONTROLLERS
const cloudWatchController = require("../controllers/cloudWatchController.js");
const stsController = require("../controllers/stsController.js");

const router = express.Router();

router.get('/logs', stsController.getCreds, cloudWatchController.getLogs, cloudWatchController.formatLogs, (req, res) => {
  return res.status(200).json(res.locals.formattedLogs);
});

module.exports = router;