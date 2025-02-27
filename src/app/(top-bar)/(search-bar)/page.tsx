import MonthEvent from "@/components/Home/MonthEvent";
import Image from "next/image";

import styles from "./page.module.css";
import NonLogin from "@/components/Home/NonLogin";
import UnderWay from "@/components/Home/Underway";

export default function Home() {
  return (
    <div className={styles.Container}>
      <MonthEvent />
      <NonLogin />
      <UnderWay />
      <div className={styles.Bg}>
        <Image
          src={"/img/home/star1.png"}
          alt=""
          width={289}
          height={289}
          className={styles.star1}
        />
        <Image
          src={"/img/home/star2.png"}
          alt=""
          width={289}
          height={289}
          className={styles.star2}
        />
        <Image
          src={"/img/home/star3.png"}
          alt=""
          width={289}
          height={289}
          className={styles.star3}
        />
        <Image
          src={"/img/home/star4.png"}
          alt=""
          width={289}
          height={289}
          className={styles.star4}
        />
      </div>
    </div>
  );
}
