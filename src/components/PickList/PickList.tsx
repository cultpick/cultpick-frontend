import PickListItem from "./PickListItem";
import styles from "./PickList.module.css";
import { PickList as PickListType } from "@/model/pick";

interface PickListProps {
  isEditMode: boolean;
  data?: PickListType;
  isLoading: boolean;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PickList({
  isEditMode,
  data,
  isLoading,
  selectedItems,
  setSelectedItems,
}: PickListProps) {
  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!data || data.performanceList.length === 0) {
    return (
      <div className={styles.empty}>No performances in your pick list</div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.performanceGrid}>
        {data.performanceList.map((performance) => (
          <PickListItem
            key={performance.id}
            performance={performance}
            isEditMode={isEditMode}
            isSelected={selectedItems.includes(performance.id)}
            onSelect={toggleSelectItem}
          />
        ))}
      </div>
    </div>
  );
}
