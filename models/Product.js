import mongoose from "mongoose";
const { Schema, model } = mongoose;

// createing a schema to add products data in db

// const ProductSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   images: {
//     type: Schema.Types.ObjectId,
//     default: [],
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   uploadBy: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "user",
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

const ProductSchema = new Schema({
  images: {
    type: Schema.Types.ObjectId,
    default: [],
  },
});

const Products = model("product", ProductSchema);
export default Products;
