import { get, getSsr } from "@/api/client";
import { queryKeys } from "@/states/server/queryKeys";
import { PerformanceList } from "@/model/performance";

/**
 * 공연 목록 조회 API
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @returns {PerformanceList}
 */
export const getPerformanceList = async (
  page: number,
  size: number,
): Promise<PerformanceList> => {
  try {
    const params = { page: page.toString(), size: size.toString() };
    const queryString = new URLSearchParams(params).toString();
    const response = await get<PerformanceList>(
      `/performance/list?${queryString}`,
      { ssr: false },
    );
    return response;
  } catch (error) {
    console.error("공연 목록 조회 실패:", error);
    return { performanceList: [], count: 0, hasNext: false };
  }
};

/**
 * SSR용 공연 목록 조회 API
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @returns {PerformanceList}
 */
export const getSsrPerformanceList = async (
  page: number,
  size: number,
): Promise<PerformanceList> => {
  try {
    const params = { page: page.toString(), size: size.toString() };
    const queryString = new URLSearchParams(params).toString();
    const response = await getSsr<PerformanceList>(
      `/performance/list?${queryString}`,
    );
    return response;
  } catch (error) {
    console.error("SSR 공연 목록 조회 실패:", error);
    return { performanceList: [], count: 0, hasNext: false };
  }
};
