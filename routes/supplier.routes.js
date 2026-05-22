import express from "express";
import {
  createSupplier,
  deleteSupplier,
  editSupplier,
  fetchSuppliers,
  getSingle,
} from "../controllers/supplier.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const supplierRouter = express.Router();

supplierRouter
  .post("/add", authMiddleware, createSupplier)
  .get("/", authMiddleware, fetchSuppliers)
  .get("/:supplierId", authMiddleware, getSingle)
  .put("/update/:supplierId", authMiddleware, editSupplier)
  .delete("/delete/:supplierId", authMiddleware, deleteSupplier);

export default supplierRouter;
