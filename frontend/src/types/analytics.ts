export interface SalesChartData {
  date: string;
  total: number;
}

export interface PendingOrder {
  id: number;
  total: number;
  status: string;
}

export interface Analytics {
  totalOrders: number;
  totalSpent: number;
  booksListed: number;
  pendingOrders: number;
  salesChart: SalesChartData[];
  recentPendingOrders: PendingOrder[];
}
