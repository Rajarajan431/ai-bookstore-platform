"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMyOrders } from "@/store/slices/order.slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function RecentOrders() {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const recentOrders = orders?.slice(0, 5) ?? [];

  return (
    <Card className="lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Link href="/dashboard/orders">
          <Button variant="ghost" size="sm">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && (
          <p className="text-sm text-muted-foreground">
            Loading recent orders...
          </p>
        )}

        {!loading && recentOrders.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No recent orders found
          </p>
        )}

        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b last:border-none pb-3 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium">Order #{order.id}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right space-y-1">
              <p className="text-sm font-semibold">₹{order.total}</p>
              <OrderStatus status={order.status} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ---------------- Status Badge ---------------- */

function OrderStatus({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={`${colors[status]} border-none`}>
      {status}
    </Badge>
  );
}
