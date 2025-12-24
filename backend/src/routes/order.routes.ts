import { Router } from "express";
import { createOrderHandler, getCartHandler, getMyOrdersHandler, getSellerOrdersHandler, updateOrderStatusHandler } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createOrderHandler);
router.get("/my", authMiddleware, getMyOrdersHandler);
router.get(
  "/seller",
  authMiddleware,
  getSellerOrdersHandler
);

// Seller: Update order item status
router.patch(
  "/seller/:id/status",
  authMiddleware,
  updateOrderStatusHandler
);
router.get("/cart", authMiddleware, getCartHandler);



export default router;
