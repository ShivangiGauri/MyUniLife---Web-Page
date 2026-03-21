import express from "express";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    userId: req.user.id,
    role: req.user.role
  });
});

export default router;