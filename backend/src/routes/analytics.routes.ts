import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Seller / Admin Analytics
 */
router.get("/", authMiddleware, getAnalytics);

export default router;
