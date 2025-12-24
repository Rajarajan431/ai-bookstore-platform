import { apiFetch } from "./api";
import { Analytics } from "@/types/analytics";

export interface AnalyticsApiResponse {
  analytics: Analytics;
  salesChart: any[]; // keep for later
}

export const getAnalytics = async (): Promise<AnalyticsApiResponse> => {
  return apiFetch("/analytics");
};
