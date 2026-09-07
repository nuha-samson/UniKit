import Course from "../models/Course.js";
import {
  clampNumber,
  isValidDate,
  isValidObjectId,
  normalizeText,
  toSafeInt,
} from "../utils/validation.js";

const toCourseResponse = (course) => ({
  id: course._id,
  title: course.title,
  instructor: course.instructor,
  assignments: course.assignments,
  examDate: course.examDate,
  progress: course.progress,
  createdAt: course.createdAt,
  updatedAt: course.updatedAt,
});

const parseCoursePayload = (body = {}) => {
  const title = normalizeText(body.title);
  const instructor = normalizeText(body.instructor);
  const assignments = clampNumber(toSafeInt(body.assignments, 0), 0, 50, 0);
  const progress = clampNumber(Number(body.progress), 0, 100, 0);
  const examDate = body.examDate ? new Date(body.examDate) : null;

  if (!title) {
    return { error: "Course title is required" };
  }

  if (body.examDate && !isValidDate(body.examDate)) {
    return { error: "examDate must be a valid date" };
  }

  return {
    data: {
      title,
      instructor,
      assignments,
      progress,
      examDate,
    },
  };
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: courses.map(toCourseResponse),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to load courses" });
  }
};

export const createCourse = async (req, res) => {
  const { error, data } = parseCoursePayload(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  try {
    const course = await Course.create({ ...data, user: req.user.id });

    return res.status(201).json({
      success: true,
      message: "Course created",
      data: toCourseResponse(course),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to create course" });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid course id" });
  }

  const { error, data } = parseCoursePayload(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  try {
    const course = await Course.findOneAndUpdate(
      { _id: id, user: req.user.id },
      data,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated",
      data: toCourseResponse(course),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update course" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid course id" });
  }

  try {
    const course = await Course.findOneAndDelete({ _id: id, user: req.user.id });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete course" });
  }
};
