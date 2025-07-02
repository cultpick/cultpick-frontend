import { get } from "@/api/client";
import { Performance, PerformanceList } from "@/model/performance";
import { QueryClient } from "@tanstack/react-query";

/**
 * 공연 목록 검색 조회
 *
 * @api [GET] /performance
 */
export const searchPerformanceList = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(params).toString();
  return get<PerformanceList>(`/performance?${queryString}`);
};

/**
 * 공연 목록 조회
 *
 * @api [GET] /performance/list
 */
export const getPerformanceList = (page: number, size: number) => {
  const params = { page: page.toString(), size: size.toString() };
  const queryString = new URLSearchParams(params).toString();
  return get<PerformanceList>(`/performance/ongoing/?${queryString}`);
};

/**
 * 공연 상세 조회
 *
 * @api [GET] /performance/:performanceId
 */
export const getPerformanceDetail = (performanceId: string) =>
  get<Performance>(`/performance/${performanceId}`);

/**
 * 홈페이지 쿼리 prefetch
 */
export async function prefetchHomeQueries() {
  const queryClient = new QueryClient();

  // 데이터 prefetch
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["recommendedPerformances", 1],
      queryFn: () => getPerformanceList(1, 10),
    }),
    queryClient.prefetchQuery({
      queryKey: ["ongoingPerformances", 1],
      queryFn: () => getPerformanceList(1, 10),
    }),
  ]);

  return queryClient;
}
