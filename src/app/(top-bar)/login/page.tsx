import Image from "next/image";
import styles from "./page.module.css";
import BlurBox from "@/components/Login/BlurBox";
import { Suspense } from "react";

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.boxWrapper}>
          <Image
            src={"/img/typography_logo.png"}
            alt="cultpick logo"
            width={318}
            height={77}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <BlurBox />
          </Suspense>
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
