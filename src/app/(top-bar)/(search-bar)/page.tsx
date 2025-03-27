import NonLogin from "@/components/Home/NonLogin";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MonthEvent from "@/components/Home/MonthEvent";
import Underway from "@/components/Home/Underway";
import {
  getRecommendedPerformances,
  getOngoingPerformances,
} from "@/api/performance";

export default async function Home() {
  const queryClient = new QueryClient();

  // 데이터 prefetch
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["recommendedPerformances", 1],
      queryFn: () => getRecommendedPerformances(1, 10),
    }),
    queryClient.prefetchQuery({
      queryKey: ["ongoingPerformances", 1],
      queryFn: () => getOngoingPerformances(1, 10),
    }),
  ]);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MonthEvent />
      </HydrationBoundary>
      <NonLogin />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Underway />
      </HydrationBoundary>
    </main>
  );
}
