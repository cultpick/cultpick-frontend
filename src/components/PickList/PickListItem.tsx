import Image from "next/image";
import Link from "next/link";
import styles from "./PickListItem.module.css";
import { PerformanceResponse } from "@/api/performance/type";
import { transformPerformanceDates } from "@/utils/dateUtils";

interface PickListItemProps {
  performance: PerformanceResponse;
  isEditMode: boolean;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function PickListItem({ 
  performance, 
  isEditMode, 
  isSelected, 
  onSelect 
}: PickListItemProps) {
  if (!performance) {
    return null;
  }
  
  const formattedPerformance = transformPerformanceDates(performance);
  const isSameDate =
    formattedPerformance.startDate === formattedPerformance.endDate;

  const handleClick = () => {
    if (isEditMode) {
      onSelect(performance.id);
    }
  };

  return (
    <div className={styles.Container} onClick={handleClick}>
      {isEditMode && (
        <div className={`${styles.checkbox} ${isSelected ? styles.checked : ''}`}>
          {isSelected && (
            <Image
              src="/svgs/check_icon.svg"
              alt="Selected"
              width={24}
              height={24}
            />
          )}
        </div>
      )}
      
      <Link 
        href={isEditMode ? "#" : `/event/${performance.id}`} 
        className={styles.content}
        onClick={(e) => isEditMode && e.preventDefault()}
      >
        <div className={styles.imgWrapper}>
          <Image
            src={performance.posterImageUrl}
            alt={`${performance.name} 포스터`}
            width={320}
            height={320}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0+g8AAWkBM2y7Yk0AAAAASUVORK5CYII="
          />
        </div>
        <div className={styles.EventText}>
          <div className={styles.EventTitle}>{performance.name}</div>
          <div className={styles.EventCaption}>
            {formattedPerformance.startDate}
            {!isSameDate && ` ~ ${formattedPerformance.endDate}`}
            {` / ${performance.area}`}
            <br />
            {performance.price}
          </div>
        </div>
      </Link>
    </div>
  );
}