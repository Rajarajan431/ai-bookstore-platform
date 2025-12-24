import { Request, Response } from "express";
import { createOrderSchema } from "../validators/order.schema";
import { createOrder, getBuyerOrders, getCart, getSellerOrders, updateOrderItemStatus } from "../services/order.service";

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

export const getSellerOrdersHandler = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const orders = await getSellerOrders(userId);
  res.json(orders);
};

export const updateOrderStatusHandler = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const itemId = Number(req.params.id);
  const { status } = req.body;

  const updated = await updateOrderItemStatus(itemId, userId, status);
  res.json(updated);
};


export async function getCartHandler(req: Request, res: Response) {
  const buyerId = req.user!.id;
  const cart = await getCart(buyerId);
  res.json(cart);
}

