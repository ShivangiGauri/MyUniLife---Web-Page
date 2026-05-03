import cron from "node-cron";
import { runRoleExpiryCheck } from "../controllers/authController.js";

/**
 * Multi-University Role Lifecycle Management
 * Runs every day at midnight (00:00)
 */
export const initCronJobs = () => {
  console.log("[Cron] Initializing daily lifecycle cleanup job...");

  // Schedule for 00:00 every day
  cron.schedule("0 0 * * *", () => {
    try {
      console.log("[Cron] Executing daily role expiry check...");
      const updatedCount = runRoleExpiryCheck();
      console.log(`[Cron] Daily cleanup finished. ${updatedCount} users transitioned to guest.`);
    } catch (error) {
      console.error(`[Cron Error] Lifecycle check failed: ${error.message}`);
    }
  });

  // Optional: Run once on startup for development verification
  if (process.env.NODE_ENV === "development") {
    console.log("[Cron] Dev Mode: Running immediate lifecycle check...");
    runRoleExpiryCheck();
  }
};
