import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    instructor: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    code: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    credits: {
      type: Number,
      min: 0,
      max: 30,
    },

    grade: {
      type: String,
      trim: true,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;