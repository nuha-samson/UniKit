import mongoose from "mongoose";

const deadlineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    type: {
      type: String,
      enum: ["assignment", "quiz", "test", "exam", "study"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

deadlineSchema.index({ user: 1, dueDate: 1 });

const Deadline = mongoose.model("Deadline", deadlineSchema);
export default Deadline;