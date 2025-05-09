import { QueryClient } from "@tanstack/react-query";
import {
  getOngoingPerformanceList,
  getRecommendedPerformanceList,
} from "@/api/performance/api";

export async function prefetchHomeQueries() {
  const queryClient = new QueryClient();

  // 데이터 prefetch
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["recommendedPerformances", 1],
      queryFn: () => getRecommendedPerformanceList(1, 10),
    }),
    queryClient.prefetchQuery({
      queryKey: ["ongoingPerformances", 1],
      queryFn: () => getOngoingPerformanceList(1, 10),
    }),
  ]);

  return queryClient;
}