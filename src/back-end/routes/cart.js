const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');



// Update an item for a user in the product page
router.post('/:userId/cartItem/:productId', shoppingCartController.updateItemToCart);

// Update an item in the shopping cart
router.put('/:userId/cartItem/:productId', shoppingCartController.updateItemInCart);

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
router.get('/:userId/subtotal', shoppingCartController.getSubtotal);

// Get the tax amount
router.get('/:userId/tax', shoppingCartController.getTax);

// apply the discount
router.post('/:userId/discount', shoppingCartController.applyDiscount);

// Get the estimated total
router.get('/:userId/estimatedTotal', shoppingCartController.getEstimatedTotal);

// Get the discount
router.get('/:userId/discount', shoppingCartController.getDiscount);

// Get the cart items
router.get('/:userId/cartItems', shoppingCartController.getCartItems);


module.exports = router;
