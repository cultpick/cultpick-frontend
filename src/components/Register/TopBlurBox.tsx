import { useState } from "react";
import styles from "./TopBlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";

export default function TopBlurBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    validatePasswordMatch(password, e.target.value);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "영문, 숫자, 특수문자 중 2가지 이상 조합의 8~20자여야 합니다.",
      );
    } else {
      setPasswordError("");
    }
  };

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordError && !passwordMatchError) {
      // 제출 로직
    }
  };

  return (
    <div className={styles.boxContainer}>
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
          placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합의 8~20자 입력"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div className={styles.error}>{passwordError}</div>}
        <InputBox
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordMatchError && (
          <div className={styles.error}>{passwordMatchError}</div>
        )}
        <div className={styles.btnWrapper}>
          <Button text="로그인" state="active" />
        </div>
      </form>
    </div>
  );
}
