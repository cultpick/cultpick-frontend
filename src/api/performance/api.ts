import axios from "axios";
import { transformPerformanceDates } from "@/utils/dateUtils";
import {
  PerformanceDetailResponse,
  PerformanceListResponse,
  SearchPerformanceListResponse,
} from "./type";

/**
 * 공연 목록 검색 조회
 *
 * @api [GET] /performance
 */
export const searchPerformanceList = async (
  page: number,
  size: number,
  q: string,
  genreCode: string,
  state: string,
  areaCode: string,
  subAreaCode: string,
): Promise<SearchPerformanceListResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/performance`,
    {
      params: {
        page,
        size,
        q,
        genreCode,
        state,
        areaCode,
        subAreaCode,
      },
    },
  );

  return data;
};

/**
 * 이달의 추천 공연 목록 조회
 *
 * @api [GET] /performance/recommended
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

  return data;
};

/**
 * 진행중 공연 목록 조회
 *
 * @api [GET] /performance/ongoing
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

  return data;
};

/**
 * 공연 상세 조회
 *
 * @api [GET] /performance/:performanceId
 */
export const getPerformanceDetail = async (
  performanceId: string,
): Promise<PerformanceDetailResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/performance/${performanceId}`,
  );

  return data;
};
