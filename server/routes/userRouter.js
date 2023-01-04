const express = require('express');
// REQUIRE CONTROLLERS
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/signup', userController.signUp, (req, res) => {
  res.status(200).json('Signup Successful!');
});

router.post('/test', userController.test, (req, res) => {
  res.status(200).json(res.locals.test);
})

module.exports = router;