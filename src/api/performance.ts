import axios from "axios";
import { Performance } from "@/types/performance";

interface PerformanceResponse {
  performanceList: Performance[];
}

export const getRecommendedPerformances = async (
  page: number,
  size: number,
): Promise<PerformanceResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/performance/recommended`,
      {
        params: {
          page,
          size,
        },
      },
    );

    // 날짜 형식 변환
    const transformedData = {
      performanceList: response.data.performanceList.map((item: any) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        const formatDate = (date: Date) => {
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${month}월 ${day}일`;
        };

        return {
          ...item,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        };
      }),
    };

    return transformedData;
  } catch (error) {
    console.error("Error fetching recommended performances:", error);
    throw error;
  }
};
