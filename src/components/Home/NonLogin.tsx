"use client";

import styles from "./NonLogin.module.css";
import Pick_IC from "@/../public/svgs/home/pick_primary.svg";
import Next_IC from "@/../public/svgs/next_arrow.svg";
import { useRouter } from "next/navigation";

export default function NonLogin() {
  const router = useRouter();
  const onClick = () => {
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          당신의 취향에 맞는 행사들을 추천 받으세요.
        </div>
        <div className={styles.caption}>
          컬픽이 당신을 위한 사용자 맞춤형 추천을 해드립니다.
        </div>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.iconWrapper}>
          <Pick_IC />
        </div>
        <button className={styles.loginBtn} onClick={onClick}>
          로그인하러 가기
          <Next_IC />
        </button>
      </div>
    </div>
  );
}
