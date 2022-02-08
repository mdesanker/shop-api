import mongoose from "mongoose";
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

export interface UserTypes {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  picture?: string;
}

const UserSchema = new Schema<UserTypes>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String },
});

UserSchema.plugin(findOrCreate);

export default mongoose.model("User", UserSchema);
