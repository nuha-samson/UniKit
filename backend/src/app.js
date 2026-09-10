import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import deadlineRoutes from "./routes/deadline.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
// origin: process.env.CLIENT_URL? process.env.CLIENT_URL.split(",").map((value) => value.trim()): true,
    credentials: false,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniKit API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/deadlines", deadlineRoutes);
app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((error, req, res, next) => {
  console.error("Unhandled server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;