import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connect.js";
import cors from "cors";
const app = express();

dotenv.config();
//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

//Loacal import
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes//categoryRoutes.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import orderoutes from "./routes/order.routes.js"

//use
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/order", orderoutes)

const PORT = Number(process.env.PORT || 8888);
const startServer = async () => {
  try {
    connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to run the server");
  }
};
startServer();
