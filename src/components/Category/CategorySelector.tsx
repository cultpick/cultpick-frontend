"use client";

import { CATEGORIES } from "@/store/categoryState";
import { useCategorySelection } from "@/hooks/useCategorySelection";
import styles from "./CategorySelector.module.css";

export default function CategorySelector() {
  const { selectedCategories, toggleCategory, isSelected, canSelectMore } = useCategorySelection();

  return (
    <div className={styles.container}>
      <div className={styles.categoryGrid}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`${styles.categoryButton} ${
              isSelected(category) ? styles.selected : ""
            }`}
            disabled={!isSelected(category) && !canSelectMore}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.selectedCount}>
        {selectedCategories.length} / {3} 선택됨
      </div>
    </div>
  );
} 