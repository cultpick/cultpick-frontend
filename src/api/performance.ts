import axios from "axios";
import { Performance } from "@/types/performance";
import { transformPerformanceDates } from "@/utils/dateUtils";

interface PerformanceResponse {
  performanceList: Performance[];
}

export const getRecommendedPerformances = async (
  page: number,
  size: number,
): Promise<PerformanceResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/performance/recommended`,
    {
      params: {
        page,
        size,
      },
    },
  );

  const transformedData = {
    performanceList: response.data.performanceList.map(
      transformPerformanceDates,
    ),
  };

  return transformedData;
};

export const getOngoingPerformances = async (
  page: number,
  size: number,
): Promise<PerformanceResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/performance/ongoing`,
    {
      params: {
        page,
        size,
      },
    },
  );

  const transformedData = {
    performanceList: response.data.performanceList.map(
      transformPerformanceDates,
    ),
  };

  return transformedData;
};
