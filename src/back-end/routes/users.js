var express = require('express');
var router = express.Router();
var userController = require("../controllers/authController");
var { verifyTokenAndRole } = require("../controllers/userController");

router.post('/auth/signup', verifyTokenAndRole("public"), userController.handleSignup);
router.post('/auth/signin', verifyTokenAndRole("public"), userController.handleSignin);
router.post('/auth/updatePassword', verifyTokenAndRole("public"), userController.handleUpdatePassword);

// some user apis

module.exports = router;
