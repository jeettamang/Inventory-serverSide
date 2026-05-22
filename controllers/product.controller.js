import { ProductModel } from "../models/product.model.js";

const createProduct = async (req, res) => {
  try {
    const { name, description,supplier, category, price, stock, image } = req.body;
    if (!name || !category || !supplier || !stock) {
      return res
        .status(400)
        .json({ message: "Name, category, supplier and stock quantity are required" });
    }
    const product = await ProductModel.findOne({ name });
    if (product) {
      return res.status(400).json({ message: "Product already exist" });
    }

    const newProduct = await ProductModel.create({
      name,
      description,
      category,
      supplier,
      price,
      stock,
      image,
    });
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during product creation",
      err: error.message,
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category supplier");

    res.status(200).json({ message: "Products fetched", products });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during product fetching",
      err: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId).populate("category supplier");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product fetched", product });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during product fetching",
      err: error.message,
    });
  }
};
const editProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const { name, description, category, supplier, price, stock, image } = req.body;
    const productDetail = { name, description, supplier, category, price, stock, image };

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      productDetail,
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(201)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during product updation",
      err: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during product deletion",
      err: error.message,
    });
  }
};
export {
  createProduct,
  getProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
};
