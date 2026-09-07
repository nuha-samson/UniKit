import Deadline from "../models/Deadline.js";
import {
  isValidDate,
  isValidObjectId,
  normalizeText,
} from "../utils/validation.js";

const priorities = new Set(["low", "medium", "high"]);

const toDeadlineResponse = (deadline) => ({
  id: deadline._id,
  title: deadline.title,
  course: deadline.course,
  dueDate: deadline.dueDate,
  priority: deadline.priority,
  completed: deadline.completed,
  createdAt: deadline.createdAt,
  updatedAt: deadline.updatedAt,
});

const parseDeadlinePayload = (body = {}) => {
  const title = normalizeText(body.title);
  const course = normalizeText(body.course);
  const priority = normalizeText(body.priority).toLowerCase() || "medium";

  if (!title) {
    return { error: "Deadline title is required" };
  }

  if (!body.dueDate || !isValidDate(body.dueDate)) {
    return { error: "Valid dueDate is required" };
  }

  if (!priorities.has(priority)) {
    return { error: "priority must be low, medium, or high" };
  }

  return {
    data: {
      title,
      course,
      dueDate: new Date(body.dueDate),
      priority,
      completed: Boolean(body.completed),
    },
  };
};

export const getDeadlines = async (req, res) => {
  try {
    const deadlines = await Deadline.find({ user: req.user.id }).sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      data: deadlines.map(toDeadlineResponse),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to load deadlines" });
  }
};

export const createDeadline = async (req, res) => {
  const { error, data } = parseDeadlinePayload(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  try {
    const deadline = await Deadline.create({ ...data, user: req.user.id });

    return res.status(201).json({
      success: true,
      message: "Deadline created",
      data: toDeadlineResponse(deadline),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to create deadline" });
  }
};

export const updateDeadline = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid deadline id" });
  }

  const { error, data } = parseDeadlinePayload(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  try {
    const deadline = await Deadline.findOneAndUpdate(
      { _id: id, user: req.user.id },
      data,
      { new: true, runValidators: true }
    );

    if (!deadline) {
      return res.status(404).json({ success: false, message: "Deadline not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deadline updated",
      data: toDeadlineResponse(deadline),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update deadline" });
  }
};

export const toggleDeadlineCompletion = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid deadline id" });
  }

  try {
    const deadline = await Deadline.findOne({ _id: id, user: req.user.id });

    if (!deadline) {
      return res.status(404).json({ success: false, message: "Deadline not found" });
    }

    deadline.completed = !deadline.completed;
    await deadline.save();

    return res.status(200).json({
      success: true,
      message: "Deadline status updated",
      data: toDeadlineResponse(deadline),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update deadline status" });
  }
};

export const deleteDeadline = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid deadline id" });
  }

  try {
    const deadline = await Deadline.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deadline) {
      return res.status(404).json({ success: false, message: "Deadline not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deadline deleted",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete deadline" });
  }
};
