const mongoose = require('mongoose');
const { Schema } = mongoose;
const CartItem = require('./cartItem');

const shoppingCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [CartItem.schema]
},
{
    timestamps: true
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
