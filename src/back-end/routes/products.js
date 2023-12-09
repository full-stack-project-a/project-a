const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductByID);
router.put('/:id', productController.editProduct);
router.get('/', productController.getProducts);

module.exports = router;