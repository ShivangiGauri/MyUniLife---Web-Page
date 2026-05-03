import express from "express";
import { register, login, getMe, runRoleExpiryCheck } from "../../controllers/authController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);

// For testing lifecycle management
router.post("/expiry-check", (req, res) => {
  const count = runRoleExpiryCheck();
  res.json({ message: "Expiry check completed", updatedUsers: count });
});

export default router;