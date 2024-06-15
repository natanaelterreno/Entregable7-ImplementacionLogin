import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    status: Boolean,
    category: String
});

const productModel = model('products', productSchema);

export default productModel;
