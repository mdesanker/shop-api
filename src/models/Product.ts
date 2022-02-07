import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

export default mongoose.model("Product", ProductSchema);
