import { Router } from "express";
import {
  getCartHandler,
  addToCartHandler,
  removeFromCartHandler,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", authMiddleware, getCartHandler);
router.post("/add", authMiddleware, addToCartHandler);
router.delete("/:itemId", authMiddleware, removeFromCartHandler);

export default router;
