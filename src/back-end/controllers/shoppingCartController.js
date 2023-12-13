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
        res.status(200).json(cart || { user: userId, items: [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add an item to the shopping cart and update cart-related fields
const addToCart = async (req, res) => {
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
            // Update quantity if the product already exists in the cart
            cartItem.quantity += quantity;
        } else {
            // Add a new item to the cart
            cart.items.push({ product: productId, quantity });
        }

        // cart = calculatesCartData(cart);

        // Update cart-related fields
        cart.totalItems += quantity;
        const cartTotalAmount = cart.cartTotalAmount + product.price * quantity;
        cart.cartTotalAmount = cartTotalAmount;
        const discountAmount = cart.discount;

        // Calculate tax (e.g., 10% tax rate)
        const taxRate = 0.10;
        cart.tax = cartTotalAmount * taxRate;

        // Apply the discount to the original cart total amount
        let discountedTotalAmount = cartTotalAmount - discountAmount;
    
        // Ensure the discounted total amount is not below 0
        discountedTotalAmount = Math.max(0, discountedTotalAmount);
    
        // Calculate the new estimated total
        const estimatedTotal = discountedTotalAmount + cart.tax;
        cart.estimatedTotal = estimatedTotal;

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculatesCartData = (cart) => {

    const cartTotalAmount = cart.items.reduce((acc, item) => {
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
    const taxAmount = cartTotalAmount * taxRate;
    cart.tax = taxAmount;

    // Apply the discount to the original cart total amount
    let discountedTotalAmount = cartTotalAmount - discountAmount;

    // Ensure the discounted total amount is not below 0
    discountedTotalAmount = Math.max(0, discountedTotalAmount);

    // Update the shopping cart fields
    cart.cartTotalAmount = cartTotalAmount;

    // Calculate the new estimated total
    const estimatedTotal = discountedTotalAmount + taxAmount;
    cart.estimatedTotal = estimatedTotal;
    return cart;

}

// Update an item in the shopping cart and update cart-related fields
const updateCartItem = async (req, res) => {
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
            // Update quantity if the product already exists in the cart
            cartItem.quantity += quantity;
        } else {
            // Add a new item to the cart
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

        // Check if the discount code is valid (e.g., "20DOLLAROFF")
        if (discountCode === '20DOLLAROFF') {
            // Calculate the discount amount (e.g., $20 fixed discount)
            const discountAmount = 20;
            cart.discount = discountAmount;

            cart = calculatesCartData(cart);

            await cart.save();

            res.status(200).json({ cart });
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
const getCartTotalAmount = async (req, res) => {
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

        res.status(200).json({ cartTotalAmount: totalAmount });
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
        const cartTotalAmount = cart.items.reduce((acc, item) => {
            const product = item.product;
            const quantity = item.quantity;
            return acc + product.price * quantity;
        }, 0);
        const taxAmount = cartTotalAmount * taxRate;

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
        const cartTotalAmount = cart.items.reduce((acc, item) => {
            const product = item.product;
            const quantity = item.quantity;
            return acc + product.price * quantity;
        }, 0);

        // Apply discount (if applicable)
        const discount = 10; // Example: $10 discount
        const discountedTotalAmount = cartTotalAmount - discount;

        // Calculate tax
        const taxRate = 0.10; // 10% tax rate
        const taxAmount = discountedTotalAmount * taxRate;

        // Calculate estimated total
        const estimatedTotal = discountedTotalAmount + taxAmount;

        res.status(200).json({ estimatedTotal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createShoppingCart,
    deleteShoppingCart,
    loadCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    getTotalItems,
    getCartTotalAmount,
    getTax,
    applyDiscount,
    getEstimatedTotal
};
