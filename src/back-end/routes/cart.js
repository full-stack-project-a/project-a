const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');
var { authenticateToken, verifyTokenAndRole } = require("../controllers/userController");


// Update an item for a user in the product page
router.post('/:userId/cartItem/:productId', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.updateItemToCart);

// Update an item in the shopping cart
router.put('/:userId/cartItem/:productId', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.updateItemInCart);

// Remove an item from the shopping cart
router.delete('/:userId/cartItem/:productId', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.removeCartItem);

// Create a shopping cart for user
router.post('/:userId/create', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.createShoppingCart);

// Load the shopping cart for a user
router.get('/:userId/load', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.loadCart);

// Clear the shopping cart
router.delete('/:userId/clear', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.clearCart);

// Delete a shopping cart for a user
router.delete('/:userId/delete', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.deleteShoppingCart);

// Get the total items in the shopping cart
router.get('/:userId/totalItems', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.getTotalItems);

// Get the cart total amount
router.get('/:userId/subtotal', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.getSubtotal);

// Get the tax amount
router.get('/:userId/tax', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.getTax);

// apply the discount
router.post('/:userId/discount', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.applyDiscount);

// Get the estimated total
router.get('/:userId/estimatedTotal', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.getEstimatedTotal);

// Get the discount
router.get('/:userId/discount', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.getDiscount);

// Get the cart items
router.get('/:userId/cartItems', authenticateToken, verifyTokenAndRole("authenticated"), shoppingCartController.getCartItems);


module.exports = router;
