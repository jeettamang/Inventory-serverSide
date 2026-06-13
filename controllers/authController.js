import { UserModel } from "../models/userModel.js";
import {
  comparedPassword,
  generateToken,
  hashedPassword,
} from "../utils/bcrypt__jwt.js";

const signUp = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashPass = await hashedPassword(password);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
      address,
      role,
    });
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server during signup", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please use registered email" });
    }
    const isMatch = await comparedPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.status(201).json({
      message: "User login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during login",
      error: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.status(201).json({ message: "User fetched", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {name, email, password, address, role} = req.body
    const updateData = { name, email, password, address, role };
    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found", user });
    }
    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};
export { signUp, login, getSingleUser, getUsers, updateUser, deleteUser };
