import mongoose, { Document, Model } from "mongoose";
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password?: string;
  picture?: string;
}

interface UserModel extends Model<IUser> {
  findOrCreate(id?: any, newUser?: any, cb?: any): any;
}

const UserSchema = new Schema<IUser, UserModel>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: { type: String },
  picture: { type: String },
});

UserSchema.plugin(findOrCreate);

export default mongoose.model<IUser, UserModel>("User", UserSchema);
