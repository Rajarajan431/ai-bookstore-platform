"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAnalytics } from "@/store/slices/analytics.slice";
import StatCard from "./stat-card";
import SalesChart from "./sales-chart";
import RecentOrders from "./recent-orders";

export default function DashboardClient() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading || !data) {
    return <p className="text-muted-foreground">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value={data.totalOrders} icon="ShoppingBag" />
        <StatCard title="Total Spent" value={`₹${data.totalSpent}`} icon="IndianRupee" />
        <StatCard title="Books Listed" value={data.booksListed} icon="BookOpen" />
        <StatCard title="Pending Orders" value={data.pendingOrders} icon="Clock" />
      </div>

      {/* Chart + Orders */}
      <div className="grid gap-6 lg:grid-cols-3">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  );
}
