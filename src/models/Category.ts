import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});

export default mongoose.model("Category", CategorySchema);
