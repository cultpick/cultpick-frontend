import Image from "next/image";
import EvetItem from "./EvetItem";
import styles from "./Underway.module.css";
import Next_IC from "@/../public/svgs/next_arrow.svg";

export default function UnderWay() {
  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <div className={styles.EventItemContainer}>
          <EvetItem />
          <EvetItem />
          <EvetItem />
          <EvetItem />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        {/* Rectangle을 왼쪽 여백 내부에서만 존재하도록 */}
        <img
          src="/img/home/rectangle_gradient.png"
          className={styles.rectangle}
          alt="진행 중인 행사"
        />

        <div className={styles.rightContainer}>
          <div className={styles.bottomTitle}>진행 중인 행사</div>
          <button className={styles.nextBtn}>
            더 보러가기
            <Next_IC />
          </button>
        </div>
      </div>
    </div>
  );
}
