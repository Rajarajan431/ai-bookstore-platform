"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useAppSelector((state) => state.cart);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>Your cart is empty</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          Go Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

      <div className="space-y-3">
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.book.title} × {item.quantity}
            </span>
            <span>₹ {item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t mt-4 pt-4 font-bold">
        <span>Total</span>
        <span>₹ {cart.total}</span>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Orders are placed from the cart page.
      </p>

      <Button
        variant="outline"
        className="w-full mt-4"
        onClick={() => router.push("/cart")}
      >
        Back to Cart
      </Button>
    </div>
  );
}
