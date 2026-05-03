import express from "express";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { verifyAdmin, verifyUniversityScope } from "../../middleware/adminMiddleware.js";
import * as adminController from "../../controllers/adminController.js";

const router = express.Router();

// Middleware applied to all admin routes
router.use(verifyToken, verifyAdmin, verifyUniversityScope);

// Users Management
router.get("/users", adminController.getUsers);
router.patch("/users/:id", adminController.updateUser);
router.patch("/users/:id/role", adminController.updateUser); // Alias for compatibility
router.delete("/users/:id", adminController.deleteUser);

// Events Management
router.get("/events", adminController.getAdminEvents);
router.post("/events", adminController.createAdminEvent);
router.patch("/events/:id", adminController.updateAdminEvent);
router.delete("/events/:id", adminController.deleteAdminEvent);

// Issue Tracking
router.get("/issues", adminController.getAdminIssues);
router.patch("/issues/:id/resolve", adminController.resolveIssue);

// Logs & Monitoring
router.get("/logs", adminController.getAdminLogs);

// Analytics
router.get("/analytics", adminController.getAdminAnalytics);
router.get("/dashboard-stats", adminController.getAdminAnalytics); // Alias for frontend compatibility

export default router;
