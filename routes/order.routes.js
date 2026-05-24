import express from "express";
import { addOrder, getOrders } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const orderRouter = express.Router();

orderRouter
  .post("/add", authMiddleware, addOrder)
  .get("/", authMiddleware, getOrders);

export default orderRouter;
