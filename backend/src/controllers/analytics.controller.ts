import { Request, Response } from "express";
import { getSalesChartData, getUserAnalytics } from "../services/analytics.service";


export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // 🔥 CRITICAL

    const analytics = await getUserAnalytics(userId);
    const salesChart = await getSalesChartData(userId);

    res.json({ analytics, salesChart});
  } catch (error) {
    res.status(500).json({ message: "Failed to load analytics" });
  }
};


