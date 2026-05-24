import { OrderModel } from "../models/order.model.js";
import { ProductModel } from "../models/product.model.js";

const addOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id || req.user.id;
    const product = await ProductModel.findOneAndUpdate(
      { _id: productId, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
    );
    if (!product) {
      return res.status(400).json({
        message: "Product not found or not enough stock available",
      });
    }
    const calculatedTotal = quantity * product.price;
    const newOrder = await OrderModel.create({
      userId,
      productId,
      quantity,
      totalPrice: calculatedTotal,
    });
    return res
      .status(201)
      .json({ message: "Order created successfully", newOrder });
  } catch (error) {
    console.error("Detail backend error", error);
    if (req.body.productId && req.body.quantity) {
      await ProductModel.updateOne(
        { _id: req.body.productId },
        { $inc: { stock: req.body.quantity } },
      );
    }
    return res.status(500).json({
      message: "Internal server error during order creation",
      err: error.message,
    });
  }
};
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const order = await OrderModel.find({ userId })
      .populate({
        path: "productId",
        select: "name price stock category",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .populate("userId", "name email");
    if (order.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error fetching orders",
      err: error.message,
    });
  }
};
export { addOrder, getOrders };
