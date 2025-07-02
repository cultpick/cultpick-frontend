import Image from "next/image";
import Link from "next/link";
import styles from "./EventItem.module.css";
import { Performance } from "@/model/performance";
import { transformPerformanceDates } from "@/utils/dateUtils";

interface EventItemProps {
  performance: Performance;
}

export default function EventItem({ performance }: EventItemProps) {
  if (!performance) {
    return null;
  }
  const formattedPerformance = transformPerformanceDates(performance);
  const isSameDate =
    formattedPerformance.startDate === formattedPerformance.endDate;

  return (
    <Link href={`/event/${performance.id}`} className={styles.Container}>
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
  );
}
