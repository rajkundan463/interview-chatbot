import mongoose from "mongoose";
export const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
};
//# sourceMappingURL=connection.js.map