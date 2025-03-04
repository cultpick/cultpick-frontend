"use client";
import Image from "next/image";
import styles from "./page.module.css";
import AgreeBox from "@/components/Register/Agree/AgreeBox";

export default function Agree() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.boxWrapper}>
        <div className={styles.logoContainer}>
          <Image
            src={"/img/typography_logo.png"}
            alt="cultpick logo"
            width={200}
            height={48.369}
          />
          <div className={styles.registerTitle}>약관 동의</div>
        </div>
          <AgreeBox />
        </div>
      </div>
      <div className={styles.bgImgWrapper}>
        <div className={styles.bgImg}>
          <Image
            src={"/img/background-object.png"}
            alt={"background 이미지"}
            width={2683.86}
            height={180}
          />
          <Image
            src={"/img/background-object.png"}
            alt={"background 이미지"}
            width={2683.86}
            height={180}
          />
        </div>
      </div>
      <div className={styles.gradient} />
    </div>
  );
}
