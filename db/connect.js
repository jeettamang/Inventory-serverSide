import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect DB", error);
    process.exit(1);
  }
};
