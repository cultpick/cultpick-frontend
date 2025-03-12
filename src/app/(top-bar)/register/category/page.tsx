"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { registerFormState } from "@/store/registerState";
import CategorySelector from "@/components/Category/CategorySelector";
import styles from "./page.module.css";
import Image from "next/image";

export default function CategoryPage() {
  const router = useRouter();
  const formData = useRecoilValue(registerFormState);

  useEffect(() => {
    // 회원가입 데이터가 없으면 회원가입 페이지로 리다이렉트
    if (!formData.email) {
      router.replace("/register/form");
    }
  }, [formData, router]);

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
            <div className={styles.registerTitle}>관심 카테고리 선택</div>
          </div>
          <div className={styles.blurBox}>
            <p className={styles.description}>
              마지막 단계입니다. 관심 장르를 최대 3개 선택해주세요.
            </p>
            <CategorySelector />
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
