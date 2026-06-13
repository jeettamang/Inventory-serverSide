import express from "express";
import { getData } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, getData);

export default dashboardRouter;
