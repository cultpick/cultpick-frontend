"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { registerFormState } from "@/store/registerState";
import CategorySelector from "@/components/Category/CategorySelector";
import styles from "./page.module.css";

export default function CategoryPage() {
  const router = useRouter();
  const formData = useRecoilValue(registerFormState);

  useEffect(() => {
    // 회원가입 데이터가 없으면 회원가입 페이지로 리다이렉트
    if (!formData.email) {
      router.replace("/register");
    }
  }, [formData, router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>관심 카테고리 선택</h1>
        <p className={styles.description}>
          선호하는 카테고리를 최대 3개까지 선택해주세요.
        </p>
        <CategorySelector />
      </div>
    </div>
  );
}
