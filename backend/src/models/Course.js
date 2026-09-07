import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
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
      maxlength: 100,
    },
    instructor: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    assignments: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
    examDate: {
      type: Date,
      default: null,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.index({ user: 1, title: 1 });

const Course = mongoose.model("Course", courseSchema);

export default Course;
