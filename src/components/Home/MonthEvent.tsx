import Image from "next/image";
import styles from "./MonthEvent.module.css";

export default function MonthEvent() {
  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <Image
          src={"/img/home-mock.png"}
          alt="event image"
          width={320}
          height={320}
        />
        <Image
          src={"/img/home-mock.png"}
          alt="event image"
          width={320}
          height={320}
        />
        <Image
          src={"/img/home-mock.png"}
          alt="event image"
          width={320}
          height={320}
        />
      </div>
      <div className={styles.rightTitle}>
        <div>이달의</div>
        <div>추천</div>
        <div>행사</div>
      </div>
    </div>
  );
}
