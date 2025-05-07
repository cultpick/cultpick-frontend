import axios from "axios";
import { transformPerformanceDates } from "@/utils/dateUtils";
import { PerformanceListResponse } from "./schema";

/**
 * 공연 목록 검색 조회
 *
 * @api [GET] /address
 */
export const getRecommendedPerformanceList = async (
  page: number,
  size: number,
): Promise<PerformanceListResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/performance/recommended`,
    {
      params: {
        page,
        size,
      },
    },
  );

  const transformedData = {
    count: data.count,
    performanceList: data.performanceList.map(transformPerformanceDates),
  };

  return transformedData;
};

/**
 * 진행중 공연 목록 조회
 *
 * @api [GET] /address
 */
export const getOngoingPerformanceList = async (
  page: number,
  size: number,
): Promise<PerformanceListResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/performance/ongoing`,
    {
      params: {
        page,
        size,
      },
    },
  );

  const transformedData = {
    count: data.count,
    performanceList: data.performanceList.map(transformPerformanceDates),
  };

  return transformedData;
};
