import express from "express";
import {
  initiatePayment,
  verify,
} from "../controllers/transaction.controller.js";

const payment = express.Router();

payment.post("/signature", initiatePayment);
payment.post("/verify", verify);

export default payment;
