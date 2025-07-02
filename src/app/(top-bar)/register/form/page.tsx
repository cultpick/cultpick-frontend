"use client";
import Image from "next/image";
import styles from "./page.module.css";
import TopBlurBox from "@/components/Register/TopBlurBox";
import BottomBlurBox from "@/components/Register/BottomBlurBox";
import Button from "@/components/Button";
import { useRecoilValue } from "recoil";
import { registerFormIsValidState } from "@/states/client/registerAtoms";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopBlurBoxProps {
  onVerificationComplete?: (token: string) => void;
}

export default function Register() {
  const router = useRouter();
  const isValid = useRecoilValue(registerFormIsValidState);
  const [verificationToken, setVerificationToken] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    router.push("/register/category");
  };

  const handleVerificationComplete = (token: string) => {
    setVerificationToken(token);
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
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <TopBlurBox onVerificationComplete={handleVerificationComplete} />
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
