"use client";

import { useState } from "react";
import styles from "./BlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import { useRouter } from "next/navigation";

export default function BlurBox() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickRegister = () => {
    router.push("/register/agree");
  };

  const onClickFindPass = () => {
    alert("개발 중이에요 🍔");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.boxContainer}>
      <div className={styles.loginTitle}>LOGIN</div>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <InputBox
          type="email"
          name="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
        />
        <InputBox
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className={styles.btnWrapper}>
          <Button text="로그인" state="active" />
        </div>
        <div className={styles.bottomBtnContainer}>
          <div className="body_16_B pointer" onClick={onClickRegister}>
            회원가입
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="18"
            viewBox="0 0 2 18"
            fill="none"
          >
            <path d="M1 0V18" stroke="var(--g1)" strokeWidth="1.6" />
          </svg>
          <div className="body_16_R pointer" onClick={onClickFindPass}>
            비밀번호 찾기
          </div>
        </div>
      </form>
    </div>
  );
}
