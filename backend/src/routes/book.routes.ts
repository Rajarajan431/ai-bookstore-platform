import { Router } from "express";
import {
  createBookHandler,
  getBooksHandler,
  getBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from "../controllers/book.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getBooksHandler);
router.get("/:id", getBookHandler);

router.post("/", authMiddleware, createBookHandler);
router.put("/:id", authMiddleware, updateBookHandler);
router.delete("/:id", authMiddleware, deleteBookHandler);

export default router;
