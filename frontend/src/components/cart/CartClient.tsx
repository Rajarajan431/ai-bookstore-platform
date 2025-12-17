"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart } from "@/store/slices/cart.slice";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartClient() {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0) return <p>Your cart is empty</p>;

  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-6 h-6 text-primary-700" />
        <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
      </div>

      <ScrollArea className="max-h-100px">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-900">{item.book.title}</p>
                <div className="flex items-center gap-3 mt-1 text-gray-600">
                  <span>Qty: {item.quantity}</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-gray-800 font-medium">₹ {item.price}</p>
              </div>
              <button className="p-2 rounded hover:bg-red-100">
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-6 flex justify-between items-center border-t pt-4 font-bold text-gray-900 text-lg">
        <span>Total:</span>
        <span>₹ {cart.total}</span>
      </div>

      <Button
        className="mt-6 border-2 w-full cursor-pointer
        flex items-center justify-center gap-2"
        size="lg"
      >
        <ShoppingCart className="w-5 h-5 text-white" />
        Checkout
      </Button>
    </div>
  );
}
