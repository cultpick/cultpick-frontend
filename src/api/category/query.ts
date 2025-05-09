import { useQuery } from "@tanstack/react-query";
import { getCategoryList } from "./api";
import { CategoryResponse } from "./type";

/**
 * 카테고리 목록 조회 query hook
 */
export const useCategories = () => {
  return useQuery<CategoryResponse[]>({
    queryKey: ["categories"],
    queryFn: () => getCategoryList(),
  });
};
