import { useState } from "react";
import styles from "./TopBlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";

export default function TopBlurBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordMatchErrorMessage, setPasswordMatchErrorMessage] =
    useState("");

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

    if (!passwordError) {
      validatePasswordMatch(password, e.target.value);
    }
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z\d!@#$%^&*])(?!^[A-Za-z]+$)(?!^\d+$)(?!^[!@#$%^&*]+$)[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!regex.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합의 8~20자여야 합니다.",
      );
      setPasswordMatchError(false);
      setPasswordMatchErrorMessage("");
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
      validatePasswordMatch(password, confirmPassword);
    }
  };

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMatchError(true);
      setPasswordMatchErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError(false);
      setPasswordMatchErrorMessage("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordError && !passwordMatchError) {
      console.log("Form submitted successfully!");
    }
  };

  return (
    <div className={styles.boxContainer}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>이메일</div>
          <InputBox
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>비밀번호</div>
          <div className={styles.inputWrapper}>
            <InputBox
              type="password"
              name="password"
              placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합의 8~20자 입력"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError || passwordMatchError}
            />
          </div>

          <div className={styles.inputWrapper}>
            <InputBox
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={passwordMatchError}
            />
          </div>
          {passwordError && (
            <div className={`caption ${styles.error}`}>
              {passwordErrorMessage}
            </div>
          )}
          {passwordMatchError && (
            <div className={`caption ${styles.error}`}>
              {passwordMatchErrorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
