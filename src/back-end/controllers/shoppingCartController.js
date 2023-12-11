const ShoppingCart = require('../models/shoppingCart');
const Product = require('../models/product');

// Add an item to the shopping cart
const addToCart = async (req, res) => {
    const userId = "hardcodedUserId";
    const { productId, quantity } = req.body;

    try {
        console.log(productId);
        console.log(quantity);
        const product = await Product.findById(productId);
        

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await ShoppingCart.findOne({ user: userId });
        if (!cart) {
            cart = new ShoppingCart({ user: userId });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            // Update quantity if product already exists
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item if it doesn't exist
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an item in the shopping cart
const updateCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        const cart = await ShoppingCart.findOne({ user: userId });
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove an item from the shopping cart
const removeCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try {
        const cart = await ShoppingCart.findOne({ user: userId });
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Load the shopping cart for a user
const loadCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        res.status(200).json(cart || { user: userId, items: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const saveCart = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body; // items should be an array of { product: productId, quantity: quantity }

    try {
        let cart = await ShoppingCart.findOne({ user: userId });
        if (!cart) {
            cart = new ShoppingCart({ user: userId });
        }

        let outOfStockItems = [];
        let validItems = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({ message: `Product with ID ${item.product} not found` });
            }
            if (item.quantity > product.inStockQuantity) {
                outOfStockItems.push({ product: item.product, requested: item.quantity, available: product.inStockQuantity });
            } else {
                validItems.push(item);
            }
        }

        cart.items = validItems; // Update cart with valid items
        await cart.save();

        res.status(200).json({ cart, outOfStockItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// remove all items from the cart
const clearCart = async (req, res) => {
    const userId = req.user.id;

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

module.exports = {
    addToCart,
    updateCartItem,
    removeCartItem,
    loadCart,
    saveCart,
    clearCart
};