import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./api/v1/authRoutes.js";
import contactRoutes from "./api/v1/contactRoutes.js";
import testRoutes from "./api/v1/testRoutes.js";
import uploadRoutes from "./api/v1/uploadRoutes.js";
import adminRoutes from "./api/v1/adminRoutes.js";
import superadminRoutes from "./api/v1/superadminRoutes.js";
import { getEvents, createEvent } from "./controllers/eventController.js";

dotenv.config();


const app = express();

app.use(helmet());

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter removed for development


// Static file serving safely
app.use("/uploads", express.static("uploads"));

app.use("/api/events", getEvents); // Fallback for frontend

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/superadmin", superadminRoutes);


// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (IN-MEMORY MODE)`);
});

