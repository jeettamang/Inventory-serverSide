import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

export const SupplierModel = mongoose.model("Supplier", supplierSchema);
