const Product = require('../models/product');

async function createProduct(req, res) {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.log("eroor");
        res.status(401).json({ message: error.message });
    }
}

async function getProductByID(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getProducts(req, res) {
    const { price, limit = 10, page = 1, search } = req.query;
    try {
        let query = Product.find();
        if (price === 'asc' || price === 'desc') {
            query.sort({ price: price === 'asc' ? 1 : -1 });
        } else {
            query.sort({ createdAt: -1 });
        }
        const pageSize = Math.max(limit, 10);
        const skip = (page - 1) * pageSize;
        query = query.limit(pageSize).skip(skip);
        const products = await query.exec();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function editProduct(req, res) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // 这个选项确保返回的是更新后的文档
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// /products/count
async function getTotalSize(req, res) {
    try {
        const totalSize = await Product.countDocuments();
        res.json(totalSize);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProduct,
    getProductByID,
    getProducts,
    editProduct,
    getTotalSize
};