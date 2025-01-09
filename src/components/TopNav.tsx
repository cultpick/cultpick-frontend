"use client";
import { useRouter } from "next/navigation";

import styles from "./TopNav.module.css";
import IC_SYMBOL from "@/../public/svgs/symbol.svg";

export default function TopNav() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };
  const goMap = () => {
    router.push("/map");
  };
  const goCalendar = () => {
    router.push("/calendar");
  };

  return (
    <nav className={`${styles.nav} nav_pixel_text_22`}>
      <div className={styles.left}>
        <div>
          <IC_SYMBOL />
        </div>
        <div onClick={goHome} className={`${styles.btn} `}>
          Home
        </div>
        <div onClick={goMap} className={`${styles.btn}`}>
          Map
        </div>
        <div
          onClick={goCalendar}
          className={`${styles.btn}
          `}
        >
          Calendar
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.btn}>Pick List</div>
        <div className={styles.btn}>Login</div>
      </div>
    </nav>
  );
}
