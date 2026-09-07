import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { normalizeEmail, normalizeText } from "../utils/validation.js";

const createToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

export const register = async (req, res) => {
  try {
    const name = normalizeText(req.body?.name);
    const normalizedEmail = normalizeEmail(req.body?.email);
    const password = typeof req.body?.password === "string" ? req.body.password : "";

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = createToken(user._id.toString());

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const normalizedEmail = normalizeEmail(req.body?.email);
    const password = typeof req.body?.password === "string" ? req.body.password : "";

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const name = normalizeText(req.body?.name);
    const normalizedEmail = normalizeEmail(req.body?.email);

    if (!name || !normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email: normalizedEmail },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
