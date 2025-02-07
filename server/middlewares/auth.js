import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

export const requireSignIn = (request, response, next) => {
  try {
    const decoded = jwt.verify(
      request.headers.authorization,
      process.env.JWT_SECRET
    );
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).json(error);
  }
};
export const isAdmin = async (request, response, next) => {
  try {
    const user = await User.findById(request.user._id);
    if (user.role !== 1) {
      return response.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (error) {
    return response.status(401).json(error);
  }
};
