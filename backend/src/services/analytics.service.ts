import prisma from "../lib/prisma";


export const getUserAnalytics = async (userId: number) => {
  const totalOrders = await prisma.order.count({
    where: { buyerId: userId },
  });

  const totalSpent = await prisma.order.aggregate({
    where: { buyerId: userId, status: "PAID" },
    _sum: { total: true },
  });

  const booksListed = await prisma.book.count({
    where: { sellerId: userId },
  });

  const pendingOrders = await prisma.order.count({
    where: {
      buyerId: userId,
      status: "PENDING",
    },
  });

  return {
    totalOrders,
    totalSpent: totalSpent._sum.total ?? 0,
    booksListed,
    pendingOrders,
  };
};


export const getSalesChartData = async (userId: number) => {
  const orderItems = await prisma.orderItem.findMany({
    where: {
      sellerId: userId,
      status: "SHIPPED", // or COMPLETED
    },
    select: {
      price: true,
      createdAt: true,
    },
  });

  // Group manually by date
  const salesByDate: Record<string, number> = {};

  for (const item of orderItems) {
    const date = item.createdAt.toISOString().split("T")[0];

    salesByDate[date] = (salesByDate[date] || 0) + item.price;
  }

  return Object.entries(salesByDate).map(([date, total]) => ({
    date,
    total,
  }));
};

