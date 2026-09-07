import express from "express";
import {
  createDeadline,
  deleteDeadline,
  getDeadlines,
  toggleDeadlineCompletion,
  updateDeadline,
} from "../controllers/deadline.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", getDeadlines);
router.post("/", createDeadline);
router.put("/:id", updateDeadline);
router.patch("/:id/toggle", toggleDeadlineCompletion);
router.delete("/:id", deleteDeadline);

export default router;
