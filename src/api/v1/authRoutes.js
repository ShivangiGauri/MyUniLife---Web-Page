import express from "express";
import { register, login, getMe } from "../../controllers/authController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many requests, please try again later" }
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", verifyToken, getMe);

export default router;