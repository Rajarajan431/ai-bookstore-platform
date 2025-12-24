"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAnalytics } from "@/store/slices/analytics.slice";
import StatCard from "@/app/dashboard/stat-card";
import SalesChart from "@/app/dashboard/sales-chart";

export default function AnalyticsPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) return <p>Loading analytics...</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Revenue" value={`₹${data.totalRevenue}`} icon="IndianRupee" />
        <StatCard title="Orders" value={String(data.totalOrders)} icon="ShoppingBag" />
        <StatCard title="Books" value={String(data.totalBooks)} icon="BookOpen" />
        <StatCard title="Customers" value={String(data.totalCustomers)} icon="Users" />
      </div>

      {/* Chart */}
     <SalesChart data={data.salesChart} />
    </div>
  );
}
