import { Request, Response } from "express";
import { createOrderSchema } from "../validators/order.schema";
import { createOrder, getBuyerOrders, getCart, getSellerOrders } from "../services/order.service";

export async function createOrderHandler(req: Request, res: Response) {
  try {
    const buyerId = req.user!.id;

    const body = createOrderSchema.parse(req.body);

    const order = await createOrder(buyerId, body.items);

    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getMyOrdersHandler(req: Request, res: Response) {
  try {
    const buyerId = req.user!.id;

    const orders = await getBuyerOrders(buyerId);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
}

export async function getSellerOrdersHandler(req: Request, res: Response) {
  try {
    const sellerId = req.user!.id;

    const orders = await getSellerOrders(sellerId);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch seller orders" });
  }
}

export async function getCartHandler(req: Request, res: Response) {
  const buyerId = req.user!.id;
  const cart = await getCart(buyerId);
  res.json(cart);
}

