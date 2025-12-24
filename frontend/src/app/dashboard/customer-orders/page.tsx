"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSellerOrders } from "@/store/slices/sellerOrderSlice";
import CustomerOrdersTable from "./customer-orders-table";

export default function CustomerOrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector(
    (state) => state.sellerOrders
  );

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;

  return <CustomerOrdersTable orders={orders} />;
}
