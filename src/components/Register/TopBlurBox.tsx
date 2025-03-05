"use client";

import { useState } from "react";
import styles from "./TopBlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function TopBlurBox() {
  const { formData, handleInputChange, errors, emailError } = useRegisterForm();

  return (
    <div className={styles.boxContainer}>
      <form className={styles.form}>
        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>이메일</div>
          <InputBox
            type="email"
            name="email"
            placeholder="이메일"
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
            placeholder="비밀번호"
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
      </form>
    </div>
  );
}
