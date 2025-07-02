import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getUserInfo } from "@/api/server/auth/getUserInfo";
import { getCategoryList } from "@/api/server/category/getCategoryList";
import { getAddressList } from "@/api/address/api";
import { Address } from "@/model/address";
import { PickList } from "@/model/pick";
import { getPerformanceList } from "@/api/server/performance/getPerformanceList";
import { getPerformanceDetail } from "@/api/server/performance/getPerformanceDetail";
import { getPickList } from "@/api/server/pick/getPickList";
import { queryKeys } from "./queryKeys";

// 타입 정의
type QueryKeyType =
  | (string | number)[]
  | ((...args: any[]) => (string | number)[]);

type QueryOptionType<T = unknown> = {
  queryKey: QueryKeyType;
  queryFn: () => Promise<T>;
};

type QueryOptionsType = {
  [key: string]: <T = unknown>(...args: any[]) => QueryOptionType<T>;
};

// 기본 Suspense Query 래퍼
const useBaseSuspenseQuery = <T = unknown>(
  queryOption: QueryOptionType<T>,
  options?: any,
) => {
  return useSuspenseQuery<T, Error>({
    queryKey: queryOption.queryKey,
    queryFn: queryOption.queryFn,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    ...options,
  });
};

// 기본 Query 래퍼
const useBaseQuery = <T = unknown>(
  queryOption: QueryOptionType<T> & { enabled?: boolean },
  options?: any,
) => {
  return useQuery<T, Error>({
    queryKey: queryOption.queryKey,
    queryFn: queryOption.queryFn,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    ...options,
    enabled: queryOption.enabled,
  });
};

// Query Options 정의
export const queryOptions = {
  user: () => ({
    queryKey: queryKeys.user,
    queryFn: () => getUserInfo(),
  }),
  category: () => ({
    queryKey: queryKeys.category,
    queryFn: () => getCategoryList(),
  }),
  address: () => ({
    queryKey: queryKeys.address,
    queryFn: () => getAddressList(),
  }),
  performanceList: (page: number, size: number) => ({
    queryKey: queryKeys.performanceList(page, size),
    queryFn: () => getPerformanceList(page, size),
  }),
  performanceDetail: (id: string) => ({
    queryKey: queryKeys.performanceDetail(id),
    queryFn: () => getPerformanceDetail(id),
  }),
  pickList: () => ({
    queryKey: queryKeys.pickList,
    queryFn: () => getPickList(),
  }),
};

// 유저 정보
export const useUser = () => useBaseSuspenseQuery(queryOptions.user());

// 카테고리 목록
export const useCategory = () => useBaseSuspenseQuery(queryOptions.category());

// 주소 목록
export const useAddress = () =>
  useBaseSuspenseQuery<Address[]>(queryOptions.address());

// 공연 목록 (페이지네이션)
export const usePerformanceList = (page: number, size: number) =>
  useBaseSuspenseQuery(queryOptions.performanceList(page, size));

// 공연 상세
export const usePerformanceDetail = (id: string) =>
  useBaseSuspenseQuery(queryOptions.performanceDetail(id));

// Pick 목록
export const usePickList = () =>
  useBaseSuspenseQuery<PickList>(queryOptions.pickList());

// (예시) 무한 스크롤 공연 목록
export const useInfinitePerformanceList = (size: number) =>
  useInfiniteQuery({
    queryKey: ["performanceListInfinite"],
    queryFn: ({ pageParam = 1 }) => getPerformanceList(pageParam, size),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage에서 다음 페이지 계산 (예시)
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
