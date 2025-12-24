"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart, removeFromCart, clearCart } from "@/store/slices/cart.slice";
import { placeOrder } from "@/store/slices/order.slice";

export default function CartClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { cart, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return;

    try {
      const items = cart.items.map((item) => ({
        bookId: item.book.id,
        quantity: item.quantity,
      }));

      await dispatch(placeOrder(items)).unwrap();

      dispatch(clearCart());
      alert("Order placed successfully 🎉");
      router.push("/dashboard/orders");
    } catch {
      alert("Failed to place order");
    }
  };

  if (loading) return <p className="text-center">Loading cart...</p>;
  if (!cart || cart.items.length === 0)
    return <p className="text-center">Your cart is empty</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      <ScrollArea className="max-h-100">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <div>
                <p className="font-semibold">{item.book.title}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </p>
                <p className="font-medium mt-1">
                  ₹ {item.price * item.quantity}
                </p>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="p-2 rounded hover:bg-red-100"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-between mt-6 border-t pt-4 text-lg font-bold">
        <span>Total</span>
        <span>₹ {cart.total}</span>
      </div>

      <Button
        className="w-full mt-6"
        size="lg"
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </div>
  );
}
