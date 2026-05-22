import { CategoryModel } from "../models/categoryModel.js";

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await CategoryModel.findOne({ name });
    if (category) {
      return res.status(400).json({ message: "Category already exist" });
    }

    const newCategory = await CategoryModel.create({
      name,
      description,
    });
    res.status(201).json({ message: "A new category is created", newCategory });
  } catch (error) {
    return res.status(500).josn({
      message: "Internal server error during category creation",
      error: error.message,
    });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (!categories) {
      return res.status(400).json({ message: "Categories not found" });
    }
    res.status(201).json({ message: "Categories fetched", categories });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during category fetching",
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const { name, description } = req.body;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true, runValidators: true },
    );
    if (!updatedCategory) {
      return res.status(400).json({ message: "Category not found" });
    }
    res
      .status(201)
      .json({ message: "Category updated successfully", updateCategory });
  } catch (error) {
    console.error("Update controller error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(201).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Update controller error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export { createCategory, getCategories, updateCategory, deleteCategory };
