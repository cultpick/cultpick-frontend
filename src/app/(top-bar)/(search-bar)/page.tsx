import MonthEvent from "@/components/Home/MonthEvent";
import Image from "next/image";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.Container}>
      <MonthEvent />
    </div>
  );
}
