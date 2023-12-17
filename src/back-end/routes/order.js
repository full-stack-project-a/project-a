var express = require('express');
var router = express.Router();
var { authenticateToken, verifyTokenAndRole } = require("../controllers/userController");
const orderController = require('../controllers/orderController');

router.post('/:userId', orderController.createOrder);

module.exports = router;