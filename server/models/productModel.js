const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String }],
  coverImage: { type: String },
  category: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: [
    {
      userId: { type: Number},
      userName: { type: String},
      userPhoto: { type: String},
      review: { type: String},
    },
  ],
  colors: [
    {
      colorName: { type: String, required: true },
      colorValue: { type: String, required: true },
    },
  ],
  sizes: [
    {
      size: { type: String, required: true },
      amountOfSiize: { type: Number, required: true },
    },
  ],
  dateAdded: { type: Date },
  stock: { type: Number, required: true},
  status: {
    type: String,
    enum: ["in_stock", "out_of_stock", "low_stock"],
    default: "in_stock",
  },
  sales: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", ProductSchema);
