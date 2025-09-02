import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  thumbnail: String,
  category: String,
  brand: String,
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  images: [String], // optional, if you want multiple images
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
