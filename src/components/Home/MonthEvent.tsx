import Image from "next/image";
import styles from "./MonthEvent.module.css";
import EvetItem from "./EvetItem";

export default function MonthEvent() {
  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <div className={styles.EventItemContainer}>
          <EvetItem />
          <EvetItem />
          <EvetItem />
        </div>
      </div>
      <div className={styles.rightTitle}>
        <div>이달의</div>
        <div>추천</div>
        <div>행사</div>
        <div className={styles.titleBgWrapper}>
          <Image
            src={"/img/home/three_circle.png"}
            alt={"이달의 추천 행사"}
            width={563}
            height={323}
          />
        </div>
      </div>
    </div>
  );
}
