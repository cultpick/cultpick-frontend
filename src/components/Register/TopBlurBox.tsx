"use client";

import { useState } from "react";
import styles from "./TopBlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function TopBlurBox() {
  const { formData, handleInputChange, errors } = useRegisterForm();

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
      </div>
    </div>
  );
}
