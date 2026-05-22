import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const categoryRouter = express.Router();

categoryRouter
  .post("/add", authMiddleware, createCategory)
  .get("/", getCategories)
  .put("/update/:categoryId", authMiddleware, updateCategory)
  .delete("/delete/:categoryId", authMiddleware, deleteCategory);

export default categoryRouter;
