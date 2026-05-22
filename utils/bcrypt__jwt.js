import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashedPassword = (text) => {
  return bcrypt.hash(text, Number(process.env.BCRYPT_SALT));
};
const comparedPassword = (text, hashedText) => {
  return bcrypt.compare(text, hashedText);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY },
  );
};
export { hashedPassword, comparedPassword, generateToken };
