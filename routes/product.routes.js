import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const productRouter = express.Router();
productRouter
  .post("/create", authMiddleware, createProduct)
  .get("/", getProducts)
  .get("/:productId", getSingleProduct)
  .put("/update/:productId", authMiddleware, editProduct)
  .delete("/delete/:productId", authMiddleware, deleteProduct);

export default productRouter;
