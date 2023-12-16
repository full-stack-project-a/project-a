const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('./product'); // Import the Product schema

const shoppingCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product schema
            required: true
        },
        quantity: {
            type: Number,
            default: 1 // Default quantity if not specified
        }
    }],
    totalItems: {
        type: Number,
        default: 0,
    },
    subtotal: {
        type: Number,
        default: 0.0,
    },
    tax: {
        type: Number,
        default: 0.0,
    },
    discount: {
        type: Number,
        default: 0.0,
    },
    estimatedTotal: {
        type: Number,
        default: 0.0,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
