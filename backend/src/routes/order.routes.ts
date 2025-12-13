import { Router } from "express";
import { createOrderHandler, getMyOrdersHandler, getSellerOrdersHandler } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createOrderHandler);
router.get("/my", authMiddleware, getMyOrdersHandler);
router.get("/sales", authMiddleware, getSellerOrdersHandler);



export default router;
