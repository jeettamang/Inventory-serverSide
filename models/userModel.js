import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default:"customer"
  },
});

export const UserModel = mongoose.model("User", userSchema);
