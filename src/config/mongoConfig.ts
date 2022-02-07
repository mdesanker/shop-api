import mongoose from "mongoose";

const mongoDB: string =
  (process.env.MONGODB_URI as string) || (process.env.DEV_DB_URI as string);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB connected...");
  } catch (err: any) {
    console.error(err.message);
  }
};

export default connectDB;
