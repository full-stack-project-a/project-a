const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const productController = require('../controllers/productController');
var { verifyTokenAndRole } = require("../controllers/userController");

router.post('/', verifyTokenAndRole("vendor"), productController.createProduct);
router.get('/:id', verifyTokenAndRole("public"), productController.getProductByID);
router.put('/:id', verifyTokenAndRole("vendor"),productController.editProduct);
router.get('/', verifyTokenAndRole("public"), productController.getProducts);

module.exports = router;