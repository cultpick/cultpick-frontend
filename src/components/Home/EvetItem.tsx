import Image from "next/image";
import styles from "./EvenItem.module.css";

export default function EvetItem() {
  return (
    <div className={styles.Container}>
      <Image
        src={"/img/home-mock.png"}
        alt="event image"
        width={320}
        height={320}
      />
      <div className={styles.EventText}>
        <div className={styles.EventTitle}>행사 이름 Text 기입</div>
        <div className={styles.EventCaption}>
          00월 00일 ~ 00월 00일 / 서울 종로구 전석 30000원
        </div>
      </div>
    </div>
  );
}
