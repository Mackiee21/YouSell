import mongoose from "mongoose";
import { Schema } from "mongoose";


const productSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    totalSold: Number,
    rating: Number
})


export const  Product = mongoose.model("Product", productSchema);