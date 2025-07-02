import { get, getSsr } from "@/api/client";
import { queryKeys } from "@/states/server/queryKeys";
import { Category } from "@/model/category";

/**
 * 카테고리 목록 조회 API
 * @returns {Category[]}
 */
export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const response = await get<Category[]>("/category", { ssr: false });
    return response;
  } catch (error) {
    console.error("카테고리 목록 조회 실패:", error);
    return [];
  }
};

/**
 * SSR용 카테고리 목록 조회 API
 * @returns {Category[]}
 */
export const getSsrCategoryList = async (): Promise<Category[]> => {
  try {
    const response = await getSsr<Category[]>("/category");
    return response;
  } catch (error) {
    console.error("SSR 카테고리 목록 조회 실패:", error);
    return [];
  }
};
