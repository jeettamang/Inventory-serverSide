import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    taxRate: {
      type: Number,
      default: 13,
    },
    price: {
      type: Number,
      min: [0, "Cost price cannot be negative"],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    image: {
      type: String,
      defalult: "",
    },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model("Product", productSchema);
