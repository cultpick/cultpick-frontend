import { useRecoilState } from "recoil";
import { Category, MAX_CATEGORIES, selectedCategoriesState } from "@/store/categoryState";

export function useCategorySelection() {
  const [selectedCategories, setSelectedCategories] = useRecoilState(selectedCategoriesState);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // 이미 선택된 카테고리면 제거
        return prev.filter((c) => c !== category);
      } else if (prev.length < MAX_CATEGORIES) {
        // 최대 선택 가능 개수를 넘지 않았다면 추가
        return [...prev, category];
      }
      return prev;
    });
  };

  const isSelected = (category: Category) => selectedCategories.includes(category);
  const canSelectMore = selectedCategories.length < MAX_CATEGORIES;

  return {
    selectedCategories,
    toggleCategory,
    isSelected,
    canSelectMore,
  };
} 