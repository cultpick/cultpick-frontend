"use client";

import { useState } from "react";
import styles from "./TopBlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function TopBlurBox() {
  const { formData, handleInputChange, errors } = useRegisterForm();
  const [verificationCode, setVerificationCode] = useState("");
  const [isResend, setIsResend] = useState(false);

  const handleSendCode = () => {
    alert("인증번호가 발송되었습니다.");
    setIsResend(true);
  };

  const isEmailValid = !errors.email && formData.email;
  const isPasswordValid =
    !errors.password &&
    formData.password &&
    !errors.confirmPassword &&
    formData.confirmPassword;

  const canSendEmail = isEmailValid && isPasswordValid;

  return (
    <div className={styles.boxContainer}>
      <div className={styles.form}>
        <div className={`${styles.emailTitle} ${styles.formSection}`}>
          <div className={`body_20_B ${styles.inputLabel}`}>이메일</div>
          <InputBox
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={!!errors.email}
          />
          {errors.email && (
            <div className={`caption ${styles.error}`}>{errors.email}</div>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>비밀번호</div>
          <InputBox
            type="password"
            name="password"
            placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합의 8~20자 입력"
            value={formData.password}
            onChange={handleInputChange("password")}
            error={!!errors.password}
          />
        </div>

        <div className={styles.formSection}>
          <InputBox
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            error={!!errors.confirmPassword}
          />
          {(errors.password || errors.confirmPassword) && (
            <div className={`caption ${styles.error}`}>
              {errors.password || errors.confirmPassword}
            </div>
          )}
        </div>

        <div className={styles.verificationSection}>
          <div className={styles.verificationSectionLabel}>인증번호</div>
          <input
            className={styles.verificationInput}
            type="text"
            placeholder="인증번호 4자리 입력"
            maxLength={4}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <button
          className={
            `${styles.verificationButton} ` +
            (canSendEmail ? styles.active : "") +
            (isResend ? " " + styles.resend : "")
          }
          type="button"
          onClick={handleSendCode}
          disabled={!canSendEmail}
        >
          {isResend
            ? "인증번호 이메일 재발송"
            : canSendEmail
              ? "인증번호 이메일 발송"
              : "인증번호 발송"}
        </button>
      </div>
    </div>
  );
}
