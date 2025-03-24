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
          src={performance.imageUrl}
          alt={performance.title}
          width={320}
          height={320}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles.EventText}>
        <div className={styles.EventTitle}>{performance.title}</div>
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
