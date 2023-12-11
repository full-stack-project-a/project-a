var express = require('express');
var router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');

router.post('/', shoppingCartController.addToCart);
router.put('/:id', shoppingCartController.updateCartItem);
router.delete('/:id', shoppingCartController.removeCartItem);
router.get('/', shoppingCartController.loadCart);
router.delete('/clear', shoppingCartController.clearCart);

module.exports = router;