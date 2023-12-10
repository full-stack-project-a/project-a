var express = require('express');
var router = express.Router();
var userController = require("../controllers/authController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth/signup', userController.handleSignup);
router.post('/auth/signin', userController.handleSignin);
router.post('/auth/updatePassword', userController.handleUpdatePassword);

// some user apis

module.exports = router;
