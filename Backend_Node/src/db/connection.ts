import mongoose from "mongoose";

export const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("✅ MongoDB connected");
};
