import express from "express";
import {
  deleteUser,
  getUsers,
  login,
  signUp,
  updateUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const authRouter = express.Router();

authRouter
  .post("/signup", signUp)
  .post("/login", login)
  .put("/update/:userId", authMiddleware, updateUser)
  .get("/", authMiddleware, getUsers)
  .delete("/delete/:userId", deleteUser);

export default authRouter;
