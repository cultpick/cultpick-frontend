import { Performance } from "@/types/performance";
import Image from "next/image";
import styles from "./EventItem.module.css";

interface EventItemProps {
  performance: Performance;
}

export default function EventItem({ performance }: EventItemProps) {
  if (!performance) {
    return null;
  }

  const isSameDate = performance.startDate === performance.endDate;

  return (
    <div className={styles.Container}>
      <div className={styles.imgWrapper}>
        <Image
          src={performance.posterUrl}
          alt={`${performance.name} 포스터`}
          width={320}
          height={320}
        />
      </div>
      <div className={styles.EventText}>
        <div className={styles.EventTitle}>{performance.name}</div>
        <div className={styles.EventCaption}>
          {performance.startDate}
          {!isSameDate && ` ~ ${performance.endDate}`}
          {` / ${performance.area}`}
          <br />
          {performance.price}
        </div>
      </div>
    </div>
  );
}
