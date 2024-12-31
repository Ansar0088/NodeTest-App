const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: [],
  price: { type: Number },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  brand: [],
  date: { type: Date, default: Date.now },
  thumbnail: { type: String },
  Images: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
