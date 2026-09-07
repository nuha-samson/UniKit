import express from "express";
import { getMe, login, register, updateMe } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import createAuthRateLimiter from "../middleware/rateLimit.middleware.js";

const router = express.Router();
const authRateLimiter = createAuthRateLimiter();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateMe);

export default router;
