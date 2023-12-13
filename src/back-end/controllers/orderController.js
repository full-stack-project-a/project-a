const Order = require('../models/order');
const ShoppingCart = require('../models/shoppingCart');

// Create an order from the shopping cart
const createOrder = async (req, res) => {
    const userId = "hardcodedUserId";

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const items = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        }));

        const totalCost = items.reduce((total, item) => total + item.quantity * item.product.price, 0);

        const newOrder = new Order({
            user: userId,
            items: items,
            totalCost: totalCost
        });

        await newOrder.save();
        await ShoppingCart.findOneAndUpdate({ user: userId }, { $set: { items: [] } }); // Clear the cart

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder
};
