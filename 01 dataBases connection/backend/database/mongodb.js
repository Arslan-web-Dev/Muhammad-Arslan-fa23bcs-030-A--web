const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const productSchema = new mongoose.Schema({
    p_id: { type: String, required: true },
    p_name: { type: String, required: true },
    p_category: { type: String, required: true },
    p_cost: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');
        console.log('Connected to the MongoDB database.');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        throw err;
    }
};

const getAll = async () => {
    const products = await Product.find().sort({ created_at: -1 });
    return products.map(p => ({
        id: p._id,
        p_id: p.p_id,
        p_name: p.p_name,
        p_category: p.p_category,
        p_cost: p.p_cost,
        created_at: p.created_at
    }));
};

const create = async (data) => {
    const product = new Product(data);
    await product.save();
    return { id: product._id, ...data };
};

const update = async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return { id: product._id, ...data };
};

const remove = async (id) => {
    await Product.findByIdAndDelete(id);
    return { id };
};

module.exports = { connect, getAll, create, update, remove };
