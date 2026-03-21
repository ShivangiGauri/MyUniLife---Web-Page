import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import connectDB from "./config/db.js";
import authRoutes from "./api/v1/authRoutes.js";
import contactRoutes from "./api/v1/contactRoutes.js";
import testRoutes from "./api/v1/testRoutes.js";
import uploadRoutes from "./api/v1/uploadRoutes.js";
import adminRoutes from "./api/v1/adminRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later" }
});
app.use("/api", globalLimiter);

const strictLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many requests, please try again later" }
});
app.use("/api/v1/auth", strictLimiter);

// Static file serving safely
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
