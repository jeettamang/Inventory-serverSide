import { SupplierModel } from "../models/supplier.model.js";

const createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email and phone are required" });
    }
    const existingSupplier = await SupplierModel.findOne({ email });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exist" });
    }
    const supplier = await SupplierModel.create({
      name,
      email,
      phone,
      address,
    });
    res.status(201).json({ message: "Supplier created", supplier });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during supplier creation",
      err: error.message,
    });
  }
};
const fetchSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find();
    res.status(200).json({ message: "Suppliers fetched", suppliers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};
const getSingle = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const supplier = await SupplierModel.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier found", supplier });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};
const editSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { name, email, phone, address } = req.body;
    const supplierData = {
      name,
      email,
      phone,
      address,
    };
    const supplier = await SupplierModel.findByIdAndUpdate(
      supplierId,
      supplierData,
      { new: true, runValidators: true },
    );
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res
      .status(200)
      .json({ message: "Supplier updated successfully", supplier });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", err: error.message });
  }
};
const deleteSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const supplier = await SupplierModel.findByIdAndDelete(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};
export {
  createSupplier,
  fetchSuppliers,
  getSingle,
  editSupplier,
  deleteSupplier,
};
