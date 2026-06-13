import { OrderModel } from "../models/order.model.js";
import { ProductModel } from "../models/product.model.js";

const getData = async (req, res) => {
  try {
    const totalProducts = await ProductModel.countDocuments();
    const stockResult = await ProductModel.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);
    const totalStock = stockResult[0]?.totalStock || 0;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const ordersToday = await OrderModel.countDocuments({
      orderDate: { $gte: startOfDay, $lte: endOfDay },
    });

    const revenueResult = await OrderModel.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);
    const revenue = revenueResult[0].totalRevenue || 0;

    const outOfStock = await ProductModel.find({ stock: 0 })
      .select("name stock")
      .populate("category", "name");

    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      stats: {
        totalProducts,
        totalStock,
        ordersToday,
        revenue,
        outOfStock,
      },
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    return res.status(500).json({
      message: "Internal server error",
      err: error.message,
    });
  }
};
export { getData };
