"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import {
  registerFormState,
  verificationTokenState,
} from "@/states/client/registerAtoms";
import CategorySelector from "@/components/Category/CategorySelector";
import styles from "./page.module.css";
import Image from "next/image";
import { useAddress } from "@/states/server/queries";
import { RegisterFormData } from "@/schemas/registerSchema";
import { useSignUp } from "@/states/server/mutations";
import { SignUpRequest } from "@/model/auth";

export default function CategoryPage() {
  const router = useRouter();
  const formData = useRecoilValue(registerFormState);
  const verificationToken = useRecoilValue(verificationTokenState);
  const { data: addressData } = useAddress();
  const [selectedCategoryCodes, setSelectedCategoryCodes] = useState<string[]>(
    [],
  );

  const signUpMutation = useSignUp({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    },
  });

  useEffect(() => {
    // 회원가입 데이터가 없으면 회원가입 페이지로 리다이렉트
    if (!formData.email) {
      router.replace("/register/form");
    }
  }, [formData, router]);

  const handleComplete = (categoryCodes: string[]) => {
    setSelectedCategoryCodes(categoryCodes);
    const requestData: SignUpRequest = {
      email: formData.email ?? "",
      password: formData.password ?? "",
      name: formData.name ?? "",
      gender: formData.gender === "남성" ? "MALE" : "FEMALE",
      birthDate: `${formData.birthYear ?? ""}-${(formData.birthMonth ?? "").padStart(2, "0")}-${(formData.birthDay ?? "").padStart(2, "0")}`,
      addressCode: formData.address ?? "",
      favoriteCategoryCodes: categoryCodes,
    };

    signUpMutation.mutate({
      data: requestData,
      verificationToken,
    });
  };

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
            <CategorySelector onComplete={handleComplete} />
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
