import mongoose from "mongoose";
import Deadline from "../models/Deadline.js";
import Course from "../models/Course.js";

const allowedTypes = ["assignment", "quiz", "test", "exam", "study"];
const allowedPriorities = ["low", "medium", "high"];

const validateDeadlineInput = ({
  title,
  course,
  type,
  dueDate,
  priority,
  description,
}) => {
  if (!title || !course || !type || !dueDate) {
    return "Title, course, type, and due date are required";
  }
  if (!allowedTypes.includes(type)) {
    return "Invalid deadline type";
  }
  if (priority !== undefined && !allowedPriorities.includes(priority)) {
    return "Invalid priority";
  }
  if (description !== undefined && description.length > 1000) {
    return "Description is too long";
  }
  const parsedDate = new Date(dueDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid due date";
  }
  return null;
};

export const createDeadline = async (req, res) => {
  try {
    const {
      title,
      course,
      type,
      dueDate,
      priority,
      description,
    } = req.body;

    const validationError = validateDeadlineInput({
      title,
      course,
      type,
      dueDate,
      priority,
      description,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const ownedCourse = await Course.findOne({
      _id: course,
      user: req.user.id,
    });

    if (!ownedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const deadline = await Deadline.create({
      user: req.user.id,
      title: title.trim(),
      course,
      type,
      dueDate: new Date(dueDate),
      priority: priority || "medium",
      description: description?.trim() || "",
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
      .sort({ completedAt: 1, dueDate: 1 });

    return res.status(200).json({
      success: true,
      deadlines,
    });
  } catch (error) {
    console.error("Get deadlines error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load deadlines",
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
      message: "Failed to load deadline",
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

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty",
        });
      }
      deadline.title = title.trim();
    }

    if (course !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(course)) {
        return res.status(400).json({
          success: false,
          message: "Invalid course ID",
        });
      }

      const ownedCourse = await Course.findOne({
        _id: course,
        user: req.user.id,
      });

      if (!ownedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      deadline.course = course;
    }

    if (type !== undefined) {
      if (!allowedTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid deadline type",
        });
      }
      deadline.type = type;
    }

    if (dueDate !== undefined) {
      const parsedDate = new Date(dueDate);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid due date",
        });
      }
      deadline.dueDate = parsedDate;
    }

    if (priority !== undefined) {
      if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid priority",
        });
      }
      deadline.priority = priority;
    }

    if (description !== undefined) {
      if (description.length > 1000) {
        return res.status(400).json({
          success: false,
          message: "Description is too long",
        });
      }
      deadline.description = description.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "Completed must be a boolean",
        });
      }
      deadline.completedAt = completed ? new Date() : null;
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