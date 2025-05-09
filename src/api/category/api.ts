import axios from "axios";
import { CategoryResponse } from "./type";

/**
 * 카테고리 목록 조회
 *
 * @api [GET] /category
 */
export const getCategoryList = async (): Promise<CategoryResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category`,
  );

  return data;
};
