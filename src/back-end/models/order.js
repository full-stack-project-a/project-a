const mongoose = require('mongoose');
const { Schema } = mongoose;
const CartItem = require('./cartItem');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [CartItem.schema],
    totalCost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
