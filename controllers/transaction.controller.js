import crypto from "crypto";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ProductModel } from "../models/product.model.js";

const initiatePayment = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const itemSubtotal = product.price * Number(product.quantity);
    const taxAmount = Math.round(itemSubtotal * (product.taxRate / 100));
    const deliveryCharge = itemSubtotal > 1000 ? 0 : 100;

    const totalAmount = itemSubtotal + taxAmount + deliveryCharge;
    const productCode = process.env.PRODUCT_CODE;
    const new_uuid = uuidv4();
    const hashString = `total_amount=${totalAmount},transaction_uuid=${new_uuid},product_code=${productCode}`;
    const signature = crypto
      .createHmac("sha256", process.env.ESEWA_SECRET)
      .update(hashString)
      .digest("base64");

    return res.json({
      success: true,
      paymentPayload: {
        amount: String(itemSubtotal),
        failure_url: "http://localhost:5173/failure",
        product_delivery_charge: String(deliveryCharge),
        product_service_charge: "0",
        product_code: productCode,
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:5173/success",
        tax_amount: String(taxAmount),
        total_amount: String(totalAmount),
        transaction_uuid: new_uuid,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const { product_code, transaction_uuid, total_amount } = req.body;

    const esewaRes = await axios.get(
      `https://rc-epay.esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`,
    );

    const result = esewaRes.data;

    if (result && result.status === "COMPLETE") {
      return res.json({
        success: true,
        message: "Payment verified successfully",
        result,
      });
    }

    return res
      .status(400)
      .json({ success: false, message: "Payment verification failed", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export {initiatePayment, verify };
