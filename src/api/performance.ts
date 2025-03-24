import axios from "axios";
import { Performance } from "@/types/performance";

interface PerformanceResponse {
  performanceList: Performance[];
}

export const getRecommendedPerformances = async (
  page: number,
  pageSize: number,
): Promise<PerformanceResponse> => {
  try {
    const response = await axios.get(`/api/performances/recommended`, {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended performances:", error);
    throw error;
  }
};
