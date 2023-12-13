const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');



// Create an item for a user
router.post('/:userId/cartItem/:productId', shoppingCartController.addToCart);

// Update an item in the shopping cart
router.put('/:userId/cartItem/:productId', shoppingCartController.updateCartItem);

// Remove an item from the shopping cart
router.delete('/:userId/cartItem/:productId', shoppingCartController.removeCartItem);

// Create a shopping cart for user
router.post('/:userId/create', shoppingCartController.createShoppingCart);

// Load the shopping cart for a user
router.get('/:userId/load', shoppingCartController.loadCart);

// Clear the shopping cart
router.delete('/:userId/clear', shoppingCartController.clearCart);

// Delete a shopping cart for a user
router.delete('/:userId/delete', shoppingCartController.deleteShoppingCart);

// Get the total items in the shopping cart
router.get('/:userId/totalItems', shoppingCartController.getTotalItems);

// Get the cart total amount
router.get('/:userId/cartTotalAmount', shoppingCartController.getCartTotalAmount);

// Get the tax amount
router.get('/:userId/tax', shoppingCartController.getTax);

// Get the discount amount
router.put('/:userId/discount', shoppingCartController.applyDiscount);

// Get the estimated total
router.get('/:userId/estimatedTotal', shoppingCartController.getEstimatedTotal);


module.exports = router;
