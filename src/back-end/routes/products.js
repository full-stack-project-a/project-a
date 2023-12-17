const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const productController = require('../controllers/productController');
var { authenticateToken, verifyTokenAndRole } = require("../controllers/userController");

router.post('/', authenticateToken, verifyTokenAndRole("vendor"), productController.createProduct);
router.get('/count', verifyTokenAndRole("public"), productController.getTotalSize);
router.get('/:id', verifyTokenAndRole("public"), productController.getProductByID);
router.put('/:id', authenticateToken, verifyTokenAndRole("vendor"),productController.editProduct);
router.get('/', verifyTokenAndRole("public"), productController.getProducts);

module.exports = router;