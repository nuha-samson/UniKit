import User from "../models/User.js";

export const getProfile = async (req, res) => {
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
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, academicYear, semester } = req.body;

    const updates = {};

    if (name !== undefined) {
      if (!name.trim() || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: "Name must be at least 2 characters",
        });
      }
      updates.name = name.trim();
    }

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
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

      updates.email = normalizedEmail;
    }

    if (academicYear !== undefined) {
      updates.academicYear = academicYear.trim();
    }

    if (semester !== undefined) {
      const validSemesters = ["fall", "spring", "summer"];

      if (!validSemesters.includes(semester)) {
        return res.status(400).json({
          success: false,
          message: "Invalid semester",
        });
      }

      updates.semester = semester;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};