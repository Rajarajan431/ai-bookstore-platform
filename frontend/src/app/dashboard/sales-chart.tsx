"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const mockData = [
  { date: "Mon", total: 1200 },
  { date: "Tue", total: 900 },
  { date: "Wed", total: 1500 },
  { date: "Thu", total: 1100 },
  { date: "Fri", total: 1800 },
];

export default function SalesChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <h2 className="font-semibold">Sales Overview</h2>
      </CardHeader>

      <CardContent className="h-75px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              strokeWidth={2}
              stroke="#2563eb"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
