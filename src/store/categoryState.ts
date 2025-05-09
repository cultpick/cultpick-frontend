import { atom } from "recoil";
import { CategoryResponse } from "@/api/category/type";

export const MAX_CATEGORIES = 3;

export const selectedCategoriesState = atom<CategoryResponse[]>({
  key: "selectedCategoriesState",
  default: [],
});
