"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function RegisterSuccessPage() {
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
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>회원가입이 완료되었습니다.</h1>
            <p className={styles.description}>
              컬픽이 당신의 문화 체험을 도와드릴게요!
            </p>
            <div className={styles.buttonContainer}>
              <Link href="/login" className={styles.loginButton}>
                로그인하러 가기
              </Link>
              <Link href="/" className={styles.homeButton}>
                홈으로 돌아가기
              </Link>
            </div>
          </div>
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
