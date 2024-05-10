import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (request, response) => {
  try {
    //1. Destructure name, email and password from request.body
    const { name, email, password } = request.body;

    //2. Validate all responses
    if (!name.trim()) {
      return response.json({ error: "Name is required" });
    }
    if (!email) {
      return response.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return response.json({
        error: "Password must be at least 6 characters long",
      });
    }

    //3.Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.json({ error: "Email is already taken" });
    }

    //4. Hash password:
    const hashedPassword = await hashPassword(password);

    //5. Register the user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    //6. Create signed JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //7. Send Response
    response.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (request, response) => {
  try {
    //1. Destructure name, email and password from request.body
    const { email, password } = request.body;

    //2. Validate all responses
    if (!email) {
      return response.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return response.json({
        error: "Password must be at least 6 characters long",
      });
    }

    //3.Find user in database. If not found, send error.
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.json({ error: "User not found" });
    }

    //4. Compare password: 23123k1j23b1kj23b
    const match = await comparePassword(password, existingUser.password);
    if (!match) {
      return response.json({ error: "Wrong Password" });
    }

    //5. Create signed JWT
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //7. Send Response
    response.json({
      user: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        address: existingUser.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const secret = async (request, response) => {
  await response.json({ currentUser: request.user });
};
