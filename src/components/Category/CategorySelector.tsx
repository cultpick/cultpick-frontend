"use client";

import { CATEGORIES } from "@/store/categoryState";
import { useCategorySelection } from "@/hooks/useCategorySelection";
import styles from "./CategorySelector.module.css";
import { CategoryIcon } from "./CategoryIcon";
import { useRouter } from "next/navigation";

export default function CategorySelector() {
  const router = useRouter();
  const { selectedCategories, toggleCategory, isSelected, canSelectMore } =
    useCategorySelection();

  const handleComplete = () => {
    // TODO: 선택된 카테고리 저장 로직
    router.push("/register/success");
  };

  const handleSkip = () => {
    router.push("/register/success");
  };

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
      <div className={styles.buttonContainer}>
        <button
          className={styles.completeButton}
          onClick={handleComplete}
          disabled={selectedCategories.length === 0}
        >
          선택 완료
        </button>
        <button className={styles.skipButton} onClick={handleSkip}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}
