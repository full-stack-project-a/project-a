const ShoppingCart = require('../models/shoppingCart');
const Product = require('../models/product');

// Create a shopping cart for a user
const createShoppingCart = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming you pass the user ID as a parameter

        // Check if a shopping cart already exists for the user
        const existingCart = await ShoppingCart.findOne({ user: userId });

        if (existingCart) {
            // If a shopping cart already exists, return an error
            return res.status(400).json({ error: 'ShoppingCart already exists for this user' });
        }

        // If no shopping cart exists, create a new one
        const shoppingCart = new ShoppingCart({ user: userId, items: [] });
        await shoppingCart.save();
        res.status(201).json(shoppingCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete a shopping cart for a user
const deleteShoppingCart = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming you pass the user ID as a parameter
        const shoppingCart = await ShoppingCart.findOneAndDelete({ user: userId });
        if (!shoppingCart) {
            return res.status(404).json({ error: 'ShoppingCart not found' });
        }
        res.json({ message: 'ShoppingCart deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Load the shopping cart for a user
const loadCart = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming you pass the user ID as a parameter
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        cart.discount = 0;
        await cart.save();
        res.status(200).json(cart || { user: userId, items: [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add an item to the shopping cart and update cart-related fields
const updateItemToCart = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            cart = new ShoppingCart({ user: userId, items: [] });
        }

        const cartItem = cart.items.find(item => item.product.equals(productId));

        if (cartItem) {
            // Check if the available stock is sufficient
            const totalRequestedQuantity = cartItem.quantity + quantity;
            // Check for negative quantity
            if (totalRequestedQuantity < 0) {
                return res.status(400).json({ message: 'Quantity cannot be less than 0' });
            }

            if (totalRequestedQuantity === 0) {
                // Remove item from cart if quantity is zero
                cart.items = cart.items.filter(item => !item.product.equals(productId));
            }

            if (totalRequestedQuantity > product.inStockQuantity) {
                return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
            }
            // Update quantity if the product already exists in the cart
            cartItem.quantity = totalRequestedQuantity;
        } else {
            // Add a new item to the cart if stock is sufficient
            if (quantity > product.inStockQuantity) {
                return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
            }
            cart.items.push({ product: productId, quantity });
        }

        // Update cart-related fields
        cart.totalItems += quantity;
        const subtotal = cart.subtotal + product.price * quantity;
        cart.subtotal = subtotal;
        cart.discount = 0;

        // Calculate tax (e.g., 10% tax rate)
        const taxRate = 0.10;
        cart.tax = subtotal * taxRate;
    
        // Calculate the new estimated total
        const estimatedTotal = subtotal + cart.tax;
        cart.estimatedTotal = estimatedTotal;

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculatesCartData = (cart) => {

    const subtotal = cart.items.reduce((acc, item) => {
        const product = item.product;
        const quantity = item.quantity;
        return acc + product.price * quantity;
    }, 0);

    const discountAmount = cart.discount;
    cart.totalItems = cart.items.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    // Calculate tax (if applicable)
    const taxRate = 0.10; // 10% tax rate
    const taxAmount = subtotal * taxRate;
    cart.tax = taxAmount;

    // Apply the discount to the original cart total amount
    let discountedTotalAmount = subtotal - discountAmount;

    // Ensure the discounted total amount is not below 0
    discountedTotalAmount = Math.max(0, discountedTotalAmount);

    // Update the shopping cart fields
    cart.subtotal = subtotal;

    // Calculate the new estimated total
    const estimatedTotal = discountedTotalAmount + taxAmount;
    cart.estimatedTotal = estimatedTotal;
    return cart;

}

// Update an item in the shopping cart and update cart-related fields
const updateItemInCart = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            cart = new ShoppingCart({ user: userId, items: [] });
        }

        const cartItem = cart.items.find(item => item.product.equals(productId));

        if (cartItem) {
            // Check if the available stock is sufficient
            const totalRequestedQuantity = cartItem.quantity + quantity;
            // Check for negative quantity
            if (totalRequestedQuantity < 0) {
                return res.status(400).json({ message: 'Quantity cannot be less than 0' });
            }

            if (totalRequestedQuantity === 0) {
                // Remove item from cart if quantity is zero
                cart.items = cart.items.filter(item => !item.product.equals(productId));
            }

            if (totalRequestedQuantity > product.inStockQuantity) {
                return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
            }
            // Update quantity if the product already exists in the cart
            cartItem.quantity = totalRequestedQuantity;
        } else {
            // Add a new item to the cart if stock is sufficient
            if (quantity > product.inStockQuantity) {
                return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
            }
            cart.items.push({ product: productId, quantity });
        }

        // update cart data
        cart = calculatesCartData(cart);

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// remove item from the user shopping cart
const removeCartItem = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.product.equals(productId));

        if (cartItem) {

            // Remove the item from the cart
            cart.items = cart.items.filter(item => !item.product.equals(productId));

            cart.totalItems = cart.items.reduce((acc, item) => {
                return acc + item.quantity;
            }, 0);

            cart = calculatesCartData(cart);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Apply a discount code
const applyDiscount = async (req, res) => {
    const userId = req.params.userId;
    const discountCode = req.body.discountCode; // Assuming the discount code is sent in the request body

    try {
        let cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Calculate the current total amount in the cart
        const currentTotal = cart.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        // Check if the discount code is valid (e.g., "20DOLLAROFF")
        if (discountCode === '20DOLLAROFF') {
            // Define the discount amount (e.g., $20 fixed discount)
            const discountAmount = 20;

            // Check if the current total is greater than the discount amount
            if (currentTotal > discountAmount) {
                cart.discount = discountAmount;
                cart = calculatesCartData(cart);
                await cart.save();
                res.status(200).json({ cart });
            } else {
                res.status(400).json({ message: 'Discount cannot be applied as total amount is less than discount' });
            }
        } else {
            res.status(400).json({ message: 'Invalid discount code' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Clear the shopping cart
const clearCart = async (req, res) => {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    try {
        const cart = await ShoppingCart.findOne({ user: userId });

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        cart.items = []; // Clear the items array
        await cart.save();
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the cart items in the shopping cart
const getCartItems = async (req, res) => {

    const userId = req.params.userId;

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        const cartItems = cart.items;

        res.status(200).json({ cartItems });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the total items in the shopping cart
const getTotalItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await ShoppingCart.findOne({ user: userId });

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        res.status(200).json({ totalItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the cart total amount
const getSubtotal = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Calculate the total amount by summing up the product prices
        const totalAmount = cart.items.reduce((acc, item) => {
            const product = item.product;
            const quantity = item.quantity;
            return acc + product.price * quantity;
        }, 0);

        res.status(200).json({ subtotal: totalAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the tax amount
const getTax = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Calculate tax as a percentage of the cart total amount (e.g., 10% tax rate)
        const taxRate = 0.10; // 10% tax rate
        const subtotal = cart.items.reduce((acc, item) => {
            const product = item.product;
            const quantity = item.quantity;
            return acc + product.price * quantity;
        }, 0);
        const taxAmount = subtotal * taxRate;

        res.status(200).json({ tax: taxAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the estimated total
const getEstimatedTotal = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Calculate the estimated total by summing up the product prices, applying tax and discount
        const subtotal = cart.items.reduce((acc, item) => {
            const product = item.product;
            const quantity = item.quantity;
            return acc + product.price * quantity;
        }, 0);

        // Apply discount (if applicable)
        const discount = cart.discount; // Example: $10 discount

        // Calculate tax
        const taxRate = 0.10; // 10% tax rate
        const taxAmount = subtotal * taxRate;

        // Calculate estimated total
        const estimatedTotal = subtotal + taxAmount - discount;

        res.status(200).json({ estimatedTotal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get the discount 
const getDiscount = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        const discount = cart.discount;

        res.status(200).json({ discount });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createShoppingCart,
    deleteShoppingCart,
    loadCart,
    updateItemInCart,
    updateItemToCart,
    removeCartItem,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTax,
    applyDiscount,
    getEstimatedTotal,
    getDiscount,
    getCartItems,
};
