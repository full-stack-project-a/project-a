const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    inStockQuantity: Number,
    imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);