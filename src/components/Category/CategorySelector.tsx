"use client";

import { useCategorySelection } from "@/hooks/useCategorySelection";
import styles from "./CategorySelector.module.css";
import { CategoryIcon } from "./CategoryIcon";
import { useRouter } from "next/navigation";
import Next_IC from "@/../public/svgs/next_arrow.svg";
import { useCategory } from "@/states/server/queries";

interface CategorySelectorProps {
  onComplete?: (selectedCategoryCodes: string[]) => void;
}

export default function CategorySelector({
  onComplete,
}: CategorySelectorProps) {
  const router = useRouter();
  const { selectedCategories, toggleCategory, isSelected, canSelectMore } =
    useCategorySelection();

  const { data: categories = [], isLoading } = useCategory();

  const handleComplete = () => {
    const selectedCategoryCodes = selectedCategories.map(
      (category) => category.code,
    );
    if (onComplete) {
      onComplete(selectedCategoryCodes);
    } else {
      router.push("/register/success");
    }
  };

  const handleSkip = () => {
    if (onComplete) {
      onComplete([]);
    } else {
      router.push("/register/success");
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <button
            key={category.code}
            onClick={() => toggleCategory(category)}
            className={`${styles.categoryButton} ${
              isSelected(category) ? styles.selected : ""
            }`}
            disabled={!isSelected(category) && !canSelectMore}
          >
            <CategoryIcon
              category={category.name}
              className={styles.categoryIcon}
            />
            <div className={styles.categoryText}>{category.name}</div>
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
          <Next_IC />
        </button>
      </div>
    </div>
  );
}
