import { apiRequest } from "@/lib/apiClient";
import { CategoryResponse } from "./type";

/**
 * 카테고리 목록 조회
 *
 * @api [GET] /category
 */
export const getCategoryList = async (): Promise<CategoryResponse[]> => {
  return apiRequest.get<CategoryResponse[]>("/category");
};
