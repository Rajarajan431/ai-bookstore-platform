"use client";

import { useState } from "react";
import {
  ShoppingCart,
  User,
  Package,
  Plus,
  Minus,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { addToCart } from "@/store/slices/cart.slice";

export default function BookDetailsClient({ book }: { book: any }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const increase = () => {
    if (quantity < book.stock) setQuantity((q) => q + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart(book.id)).unwrap(); // unwrap to catch errors
      router.push("/cart");
      console.log(book.id);
      
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
};


  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <Card className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl">
        <CardContent className="grid grid-cols-1 gap-10 p-8 md:grid-cols-2">
          
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-105 w-full max-w-sm rounded-xl object-cover shadow-md"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="mb-3 text-3xl font-bold text-black">
                {book.title}
              </h1>

              <div className="mb-4 flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4" />
                {book.author}
              </div>

              <p className="mb-6 text-gray-800">{book.description}</p>

              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl font-semibold text-black">
                  ${book.price}
                </span>

                <Badge>
                  {book.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <div className="mb-6 flex items-center gap-2 text-gray-600">
                <Package className="h-4 w-4" />
                {book.stock} copies available
              </div>

              {/* Quantity */}
              <div className="mb-6 flex items-center gap-4">
                <span className="font-medium text-black">Quantity</span>

                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={decrease}
                    className="p-2"
                    disabled={quantity === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="px-4 text-black">{quantity}</span>

                  <button
                    onClick={increase}
                    className="p-2"
                    disabled={quantity === book.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button size="lg" 
                className="gap-2"
                onClick={handleAddToCart}  
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button size="lg" variant="secondary" className="gap-2">
                <Zap className="h-5 w-5" />
                Buy Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
