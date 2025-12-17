import { Request, Response } from "express";
import {
  getCartByBuyerId,
  addBookToCart,
  removeItemFromCart,
} from "../services/cart.service";

export async function getCartHandler(req: Request, res: Response) {
  try {
    const buyerId = req.user!.id;
    const cart = await getCartByBuyerId(buyerId);
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
}

export async function addToCartHandler(req: Request, res: Response) {
  try {
    const buyerId = req.user!.id;
    const { bookId } = req.body;

    const cart = await addBookToCart(buyerId, bookId);
    res.json(cart);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function removeFromCartHandler(req: Request, res: Response) {
  try {
    const buyerId = req.user!.id;
    const itemId = Number(req.params.itemId);

    const cart = await removeItemFromCart(itemId, buyerId);
    res.json(cart);
  } catch {
    res.status(400).json({ message: "Failed to remove item" });
  }
}
