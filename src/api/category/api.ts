import { get } from "@/api/client";
import { Category } from "@/model/category";

/**
 * 카테고리 목록 조회
 *
 * @api [GET] /category
 */
export const getCategoryList = () => get<Category[]>("/category");
