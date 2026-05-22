import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
export const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json({ message: "No token provided" });
  }
  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const user = await UserModel.findById(decoded.userId);
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    req.user = decoded;
    next()
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" });
  }
};
