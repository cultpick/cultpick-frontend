import { get, getSsr } from "@/api/client";
import { queryKeys } from "@/states/server/queryKeys";
import { Performance } from "@/model/performance";

/**
 * 공연 상세 조회 API
 * @param performanceId 공연 ID
 * @returns {Performance}
 */
export const getPerformanceDetail = async (
  performanceId: string,
): Promise<Performance | null> => {
  try {
    const response = await get<Performance>(`/performance/${performanceId}`, {
      ssr: false,
    });
    return response;
  } catch (error) {
    console.error("공연 상세 조회 실패:", error);
    return null;
  }
};

/**
 * SSR용 공연 상세 조회 API
 * @param performanceId 공연 ID
 * @returns {Performance}
 */
export const getSsrPerformanceDetail = async (
  performanceId: string,
): Promise<Performance | null> => {
  try {
    const response = await getSsr<Performance>(`/performance/${performanceId}`);
    return response;
  } catch (error) {
    console.error("SSR 공연 상세 조회 실패:", error);
    return null;
  }
};
