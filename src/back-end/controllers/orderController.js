const Order = require('../models/order');
const ShoppingCart = require('../models/shoppingCart');

// Create an order from the shopping cart
const createOrder = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const items = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        }));

        const totalCost = cart.estimatedTotal;

        const newOrder = new Order({
            user: userId,
            items: items,
            totalAmount: totalCost
        });

        await newOrder.save();
        await ShoppingCart.findOneAndUpdate(
            { user: userId },
            {
                $set: {
                    items: [],
                    totalItems: 0,
                    subtotal: 0.0,
                    tax: 0.0,
                    discount: 0.0,
                    estimatedTotal: 0.0
                }
            }
        );
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder
};
