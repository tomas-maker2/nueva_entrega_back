import mongoose from "mongoose";

const ProductCollection = 'productos1';

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        img:{
            type: String,
            required: true
        },
        categories:{
            type: Array,
        },
        size:{
            type: String,
        },
        color:{
            type: String,
        },
        price:{
            type: Number,
            required: true
        },
        
    },
    {timestamps: true}
)

const productModel = mongoose.model(ProductCollection, ProductSchema);

export {productModel}