import mongoose, { Document, Model } from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password?: string;
  avatar?: string;
  googleId?: string;
}

const UserSchema = new Schema<IUser>({
  googleId: { type: String },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: { type: String },
  avatar: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
