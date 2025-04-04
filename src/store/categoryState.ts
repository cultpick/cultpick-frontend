import { atom } from "recoil";

export interface Category {
  code: string;
  name: string;
}

export const MAX_CATEGORIES = 3;

export const selectedCategoriesState = atom<Category[]>({
  key: "selectedCategoriesState",
  default: [],
});
