import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  description: string;
  images?: string[];
  category?: Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
});

export default mongoose.model("Product", ProductSchema);
