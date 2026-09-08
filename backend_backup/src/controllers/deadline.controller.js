import mongoose from "mongoose";
import Deadline from "../models/Deadline.js";
import Course from "../models/Course.js";

export const createDeadline = async (req, res) => {
  try {
    const { title, course, type, dueDate, priority, description } = req.body;

    if (!title || !course || !type || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Title, course, type, and due date are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const courseExists = await Course.findOne({
      _id: course,
      user: req.user.id,
    });

    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const deadline = await Deadline.create({
      user: req.user.id,
      title,
      course,
      type,
      dueDate,
      priority,
      description,
    });

    const populatedDeadline = await Deadline.findById(deadline._id).populate(
      "course",
      "name code"
    );

    return res.status(201).json({
      success: true,
      deadline: populatedDeadline,
    });
  } catch (error) {
    console.error("Create deadline error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create deadline",
    });
  }
};

export const getDeadlines = async (req, res) => {
  try {
    const deadlines = await Deadline.find({
      user: req.user.id,
    })
      .populate("course", "name code")
      .sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      deadlines,
    });
  } catch (error) {
    console.error("Get deadlines error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get deadlines",
    });
  }
};

export const getDeadline = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid deadline ID",
      });
    }

    const deadline = await Deadline.findOne({
      _id: id,
      user: req.user.id,
    }).populate("course", "name code");

    if (!deadline) {
      return res.status(404).json({
        success: false,
        message: "Deadline not found",
      });
    }

    return res.status(200).json({
      success: true,
      deadline,
    });
  } catch (error) {
    console.error("Get deadline error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get deadline",
    });
  }
};

export const updateDeadline = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid deadline ID",
      });
    }

    const deadline = await Deadline.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!deadline) {
      return res.status(404).json({
        success: false,
        message: "Deadline not found",
      });
    }

    const {
      title,
      course,
      type,
      dueDate,
      priority,
      description,
      completed,
    } = req.body;

    if (course !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(course)) {
        return res.status(400).json({
          success: false,
          message: "Invalid course ID",
        });
      }

      const courseExists = await Course.findOne({
        _id: course,
        user: req.user.id,
      });

      if (!courseExists) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      deadline.course = course;
    }

    if (title !== undefined) deadline.title = title;
    if (type !== undefined) deadline.type = type;
    if (dueDate !== undefined) deadline.dueDate = dueDate;
    if (priority !== undefined) deadline.priority = priority;
    if (description !== undefined) deadline.description = description;

    if (completed === true) {
      deadline.completedAt = new Date();
    }

    if (completed === false) {
      deadline.completedAt = null;
    }

    await deadline.save();

    const updatedDeadline = await Deadline.findById(deadline._id).populate(
      "course",
      "name code"
    );

    return res.status(200).json({
      success: true,
      deadline: updatedDeadline,
    });
  } catch (error) {
    console.error("Update deadline error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update deadline",
    });
  }
};

export const deleteDeadline = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid deadline ID",
      });
    }

    const deadline = await Deadline.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deadline) {
      return res.status(404).json({
        success: false,
        message: "Deadline not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deadline deleted successfully",
    });
  } catch (error) {
    console.error("Delete deadline error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete deadline",
    });
  }
};