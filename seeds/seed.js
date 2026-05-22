import { connectDb } from "../db/connect.js";
import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
import { hashedPassword } from "../utils/bcrypt__jwt.js";
dotenv.config()
const registerAdmin = async () => {
  try {
    await connectDb();
    const hashPassword = await hashedPassword(
      process.env.ADMIN_PASSWORD,
      Number(process.env.BCRYPT_SALT),
    );
    const admin = await UserModel.create({
      name: "Jeet Tamang",
      email: process.env.ADMIN_EMAIL,
      password: hashPassword,
      address: "Balkumari, kathmandu",
      role: "admin",
    });
    await admin.save();
    console.log("Admin created successfully")
  } catch (error) {
    console.error("Admin registration failed", error);
  }
};
registerAdmin()
