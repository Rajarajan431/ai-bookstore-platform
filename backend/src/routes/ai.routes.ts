
import { Router } from "express";
import { generateDescriptionController } from "../controllers/ai.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/book-description", authMiddleware, generateDescriptionController);

export default router;
