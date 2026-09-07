import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", getCourses);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
