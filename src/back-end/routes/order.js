var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/:userId', orderController.createOrder);

module.exports = router;