import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { name, instructor, code, credits, grade } = req.body;

    if (!name || !instructor) {
      return res.status(400).json({
        success: false,
        message: "Course name and instructor are required",
      });
    }

    const course = await Course.create({
      user: req.user.id,
      name: name.trim(),
      instructor: instructor.trim(),
      code: code?.trim() || "",
      credits,
      grade: grade?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { name, instructor, code, credits, grade } = req.body;

    const updates = {};

    if (name !== undefined) updates.name = name.trim();
    if (instructor !== undefined) updates.instructor = instructor.trim();
    if (code !== undefined) updates.code = code.trim();
    if (credits !== undefined) updates.credits = credits;
    if (grade !== undefined) updates.grade = grade.trim();

    const course = await Course.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Update course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};