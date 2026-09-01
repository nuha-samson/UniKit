import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniKit API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

export default app;
