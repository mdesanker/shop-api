import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});

export default mongoose.model("Category", CategorySchema);
