// src/routes/user.routes.ts
import { Router } from "express";
import {
  getMe,
  updateProfile,
  updatePassword,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateProfile);
router.put("/me/password", authMiddleware, updatePassword);

export default router;
