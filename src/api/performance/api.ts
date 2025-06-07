import { apiRequest } from "@/lib/apiClient";
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
  return apiRequest.get<SearchPerformanceListResponse>("/performance", {
    page,
    size,
    q,
    genreCode,
    state,
    areaCode,
    subAreaCode,
  });
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
  return apiRequest.get<PerformanceListResponse>("/performance/recommended", {
    page,
    size,
  });
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
  return apiRequest.get<PerformanceListResponse>("/performance/ongoing", {
    page,
    size,
  });
};

/**
 * 공연 상세 조회
 *
 * @api [GET] /performance/:performanceId
 */
export const getPerformanceDetail = async (
  performanceId: string,
): Promise<PerformanceDetailResponse> => {
  return apiRequest.get<PerformanceDetailResponse>(
    `/performance/${performanceId}`,
  );
};
