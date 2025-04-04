import { useState } from "react";
import { Category, MAX_CATEGORIES } from "@/store/categoryState";

export const useCategorySelection = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((c) => c.code === category.code);
      if (isSelected) {
        return prev.filter((c) => c.code !== category.code);
      } else if (prev.length < MAX_CATEGORIES) {
        return [...prev, category];
      }
      return prev;
    });
  };

  const isSelected = (category: Category) => {
    return selectedCategories.some((c) => c.code === category.code);
  };

  const canSelectMore = selectedCategories.length < MAX_CATEGORIES;

  return {
    selectedCategories,
    toggleCategory,
    isSelected,
    canSelectMore,
  };
};
