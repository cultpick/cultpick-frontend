"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { registerFormState } from "@/store/registerState";
import CategorySelector from "@/components/Category/CategorySelector";
import styles from "./page.module.css";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAddress, findAddressCode } from "@/hooks/useAddress";
import { RegisterFormData } from "@/schemas/registerSchema";

export default function CategoryPage() {
  const router = useRouter();
  const formData = useRecoilValue(registerFormState);
  const { data: addressData } = useAddress();
  const [selectedCategoryCodes, setSelectedCategoryCodes] = useState<string[]>(
    [],
  );

  const signUpMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const addressCode = findAddressCode(addressData, data.address);
      const birthDate = `${data.birthYear}-${data.birthMonth.padStart(2, "0")}-${data.birthDay.padStart(2, "0")}T00:00:00.000Z`;

      const requestData = {
        email: data.email,
        password: data.password,
        name: data.name,
        gender: data.gender === "남성" ? "MALE" : "FEMALE",
        birth: birthDate,
        ...(addressCode && { addressCode }),
        favoriteCategoryCodes: selectedCategoryCodes,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        requestData,
      );
      return response.data;
    },
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
    const requestData: RegisterFormData = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      name: formData.name,
      gender: formData.gender as "남성" | "여성",
      birthYear: formData.birthYear,
      birthMonth: formData.birthMonth,
      birthDay: formData.birthDay,
      address: formData.address,
    };

    signUpMutation.mutate(requestData);
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
