const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

