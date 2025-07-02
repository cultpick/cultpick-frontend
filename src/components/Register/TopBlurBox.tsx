"use client";

import { useState } from "react";
import styles from "./TopBlurBox.module.css";
import InputBox from "../InputBox";
import Check_IC from "@/../public/svgs/check circle.svg";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import {
  useSendEmailVerification,
  useVerifyEmail,
} from "@/states/server/mutations";
import { handleApiError } from "@/utils/errorHandler";
import { useSetRecoilState } from "recoil";
import { verificationTokenState } from "@/states/client/registerAtoms";

interface TopBlurBoxProps {
  onVerificationComplete?: (token: string) => void;
}

export default function TopBlurBox({
  onVerificationComplete,
}: TopBlurBoxProps) {
  const { formData, handleInputChange, errors } = useRegisterForm();
  const [verificationCode, setVerificationCode] = useState("");
  const [isResend, setIsResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const setVerificationToken = useSetRecoilState(verificationTokenState);

  const sendEmailMutation = useSendEmailVerification({
    onSuccess: (response) => {
      if (response.success) {
        alert("인증번호가 발송되었습니다.");
        setIsResend(true);
        setIsVerified(false);
      }
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });

  const handleSendCode = () => {
    sendEmailMutation.mutate({ email: formData.email });
  };

  const verifyEmailMutation = useVerifyEmail({
    onSuccess: (response) => {
      alert("인증이 완료되었습니다.");
      setIsVerified(true);
      setVerificationToken(response.verificationToken);
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });

  const handleVerifyCode = () => {
    if (verificationCode.length !== 4) {
      alert("인증번호 4자리를 입력해주세요.");
      return;
    }

    verifyEmailMutation.mutate({
      email: formData.email,
      code: verificationCode,
    });
  };

  const isEmailValid = !errors.email && formData.email;
  const isPasswordValid =
    !errors.password &&
    formData.password &&
    !errors.confirmPassword &&
    formData.confirmPassword;

  const canSendEmail = isEmailValid && isPasswordValid && !isVerified;

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
            disabled={isVerified}
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
            disabled={isVerified}
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
            disabled={isVerified}
          />
          {(errors.password || errors.confirmPassword) && (
            <div className={`caption ${styles.error}`}>
              {errors.password || errors.confirmPassword}
            </div>
          )}
        </div>

        <div className={styles.verificationSection}>
          <div className={styles.verificationSectionLabel}>인증번호</div>
          <div className={styles.verificationInputWrapper}>
            <input
              className={
                isVerified ? styles.verifiedInput : styles.verificationInput
              }
              type="text"
              placeholder="인증번호 4자리 입력"
              maxLength={4}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={!isResend || isVerified}
            />
            {isVerified && (
              <div className={styles.icWrapper}>
                <Check_IC />
              </div>
            )}
          </div>

          {!isVerified && (
            <button
              className={styles.confirmBtn}
              onClick={handleVerifyCode}
              disabled={
                !isResend || isVerifying || verificationCode.length !== 4
              }
            >
              {isVerifying ? "확인 중" : "확인"}
            </button>
          )}
        </div>
        <button
          className={
            `${styles.verificationButton} ` +
            (canSendEmail ? styles.active : "") +
            (isResend ? " " + styles.resend : "") +
            (isVerified ? " " + styles.verifiedButton : "")
          }
          type="button"
          onClick={handleSendCode}
          disabled={!canSendEmail || isVerified}
        >
          {isVerified
            ? "이메일 인증 완료"
            : isResend
              ? "인증번호 이메일 재발송"
              : canSendEmail
                ? "인증번호 이메일 발송"
                : "인증번호 발송"}
        </button>
      </div>
    </div>
  );
}
