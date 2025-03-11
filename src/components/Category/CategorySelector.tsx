"use client";

import { CATEGORIES } from "@/store/categoryState";
import { useCategorySelection } from "@/hooks/useCategorySelection";
import styles from "./CategorySelector.module.css";
import { CategoryIcon } from "./CategoryIcon";

export default function CategorySelector() {
  const { selectedCategories, toggleCategory, isSelected, canSelectMore } =
    useCategorySelection();

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
            <CategoryIcon category={category} className={styles.categoryIcon} />
            <div className={styles.categoryText}>{category}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
