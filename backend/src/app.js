import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import deadlineRoutes from "./routes/deadline.routes.js";
import securityHeaders from "./middleware/security.middleware.js";

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
  })
);
app.use(securityHeaders);
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniKit API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/deadlines", deadlineRoutes);

app.use((err, req, res, next) => {
  if (err?.message === "CORS not allowed") {
    return res.status(403).json({ success: false, message: "Origin is not allowed" });
  }

  return res.status(500).json({ success: false, message: "Unexpected server error" });
});

export default app;
