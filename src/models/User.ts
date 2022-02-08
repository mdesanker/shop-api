import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export default mongoose.model("User", UserSchema);
