import { atom } from "recoil";

export type Category =
  | "연극"
  | "무용"
  | "대중무용"
  | "클래식"
  | "국악"
  | "대중음악"
  | "복합"
  | "서커스·마술"
  | "뮤지컬";

export const CATEGORIES: Category[] = [
  "연극",
  "무용",
  "대중무용",
  "클래식",
  "국악",
  "대중음악",
  "복합",
  "서커스·마술",
  "뮤지컬",
];

export const MAX_CATEGORIES = 3;

export const selectedCategoriesState = atom<Category[]>({
  key: "selectedCategoriesState",
  default: [],
}); 