import { apiFetch } from "./api";
import { Order, SellerOrderItem } from "@/types/order";

export interface CreateOrderItem {
  bookId: number;
  quantity: number;
}

export const createOrder = async (
  items: CreateOrderItem[]
) => {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
};


export const getMyOrders = async (): Promise<Order[]> => {
  return apiFetch<Order[]>("/orders/my");
};

export const getSellerOrders = async (): Promise<SellerOrderItem[]> => {
  return apiFetch<SellerOrderItem[]>("/orders/seller");
};

/**
 * Update order item status
 */
export const updateOrderItemStatus = async (
  id: number,
  status: string
): Promise<SellerOrderItem> => {
  return apiFetch<SellerOrderItem>(`/orders/seller/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};