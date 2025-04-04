"use client";
import Image from "next/image";
import styles from "./page.module.css";
import TopBlurBox from "@/components/Register/TopBlurBox";
import BottomBlurBox from "@/components/Register/BottomBlurBox";
import Button from "@/components/Button";
import { useRecoilValue } from "recoil";
import {
  registerFormState,
  registerFormIsValidState,
} from "@/store/registerState";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAddress, findAddressCode } from "@/hooks/useAddress";
import { RegisterFormData } from "@/schemas/registerSchema";

export default function Register() {
  const router = useRouter();
  const { data: addressData } = useAddress();
  const formData = useRecoilValue(registerFormState);
  const isValid = useRecoilValue(registerFormIsValidState);

  const signUpMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const addressCode = findAddressCode(addressData, data.address);
      const requestData = {
        email: data.email,
        password: data.password,
        name: data.name,
        gender: data.gender === "남성" ? "MALE" : "FEMALE",
        birth: data.birth,
        ...(addressCode && { addressCode }),
        favoriteCategoryCodes: [],
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        requestData,
      );
      return response.data;
    },
    onSuccess: () => {
      router.push("/register/category");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, "0")}-${formData.birthDay.padStart(2, "0")}T00:00:00.000Z`;

    const requestData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      gender: formData.gender === "남성" ? "MALE" : "FEMALE",
      birth: birthDate,
      address: formData.address,
      favoriteCategoryCodes: [], // 카테고리 선택 페이지에서 설정
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
            <div className={styles.registerTitle}>회원가입</div>
          </div>
          <form onSubmit={handleSubmit}>
            <TopBlurBox />
            <BottomBlurBox />
            <div className={styles.btnWrapper}>
              <Button
                text="가입하기"
                state={isValid ? "active" : "disabled"}
                width="56rem"
                type="submit"
              />
            </div>
          </form>
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
