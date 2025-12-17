// src/api/cart.api.ts
import { apiFetch } from "./api";
import { Cart } from "@/types/cart";

export async function getCart(): Promise<Cart> {
  return apiFetch<Cart>("/cart/:id");
}

export async function addToCart(bookId: number): Promise<Cart> {
  return apiFetch<Cart>("/cart/add", {
    method: "POST",
    body: JSON.stringify({ bookId }),
  });
}

export async function removeFromCart(itemId: number): Promise<Cart> {
  return apiFetch<Cart>(`/cart/${itemId}`, {
    method: "DELETE",
  });
}
