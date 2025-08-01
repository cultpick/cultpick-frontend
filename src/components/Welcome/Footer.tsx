"use client";

import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/useToggle";

import Check_IC from "@/../public/svgs/check_icon.svg";
import Next_IC from "@/../public/svgs/next_arrow.svg";
import Dash_IC from "@/../public/svgs/welcome/dash.svg";

import styles from "./Footer.module.css";

export default function Footer() {
  const { isOn: isChecked, toggle: handleCheckboxChange } = useToggle();
  const router = useRouter();

  const handleStartClick = () => {
    if (isChecked) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      document.cookie = `welcomeHiddenUntil=${nextMonth.toISOString()}; expires=${nextMonth.toUTCString()}; path=/`;
    }
    router.push("/");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.checkboxContainer}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              className={styles.checkBtn}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className={styles.checkboxText}>
              이 페이지를 한 달간 다시 안 보기
            </span>
            <span className={styles.checkboxIcon}>
              <Check_IC />
            </span>
          </label>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Dash_IC />
        <button onClick={handleStartClick} className={styles.startButton}>
          CultPick 시작하기
          <Next_IC />
        </button>
      </div>
    </footer>
  );
}
