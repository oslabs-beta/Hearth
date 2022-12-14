const express = require('express');
// REQUIRE CONTROLLERS
const stsController = require("../controllers/stsController.js");
const lambdaController = require("../controllers/lambdaController.js");

const router = express.Router();

router.get('/funcs', stsController.getCreds, lambdaController.getFuncs, (req, res) => {
  return res.status(200).json(res.locals.funcs)
})

router.get('/invokefuncs', stsController.getCreds, lambdaController.getFuncs, lambdaController.invokeFuncs, (req, res) => {
  return res.status(200).send('function is now warm');
})

module.exports = router;