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
      minlength: 2,
      maxlength: 120,
    },
    course: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
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
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

deadlineSchema.index({ user: 1, dueDate: 1 });

const Deadline = mongoose.model("Deadline", deadlineSchema);

export default Deadline;
