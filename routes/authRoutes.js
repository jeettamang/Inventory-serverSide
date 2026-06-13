import express from "express";
import {
  deleteUser,
  getSingleUser,
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
  .put("/:userId", authMiddleware, updateUser)
  .get("/:userId", authMiddleware, getSingleUser)
  .get("/", authMiddleware, getUsers)
  .delete("/delete/:userId", deleteUser);

export default authRouter;
