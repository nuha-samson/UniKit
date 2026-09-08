import express from "express";
import {
  createDeadline,
  getDeadlines,
  getDeadline,
  updateDeadline,
  deleteDeadline,
} from "../controllers/deadline.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createDeadline);
router.get("/", getDeadlines);
router.get("/:id", getDeadline);
router.put("/:id", updateDeadline);
router.delete("/:id", deleteDeadline);

export default router;