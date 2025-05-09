import NonLogin from "@/components/Home/NonLogin";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import MonthEvent from "@/components/Home/MonthEvent";
import Underway from "@/components/Home/Underway";
import { prefetchHomeQueries } from "../../../api/performance/query";

export default async function Home() {
  const queryClient = await prefetchHomeQueries();

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
