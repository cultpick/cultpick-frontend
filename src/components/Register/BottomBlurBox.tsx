"use client";

import styles from "./BottomBlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import Check_IC from "@/../public/svgs/check_icon.svg";
import AddressSelector from "./Agree/AddressSelector";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function BottomBlurBox() {
  const { formData, handleInputChange, handleGenderChange } = useRegisterForm();

  return (
    <div className={styles.boxContainer}>
      <div className={styles.form}>
        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>이름</div>
          <InputBox
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleInputChange("name")}
          />
        </div>

        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>성별</div>
          <div className={styles.genderWrapper}>
            <label className={`body_18_M ${styles.checkLabel}`}>
              <input
                type="checkbox"
                className={styles.checkBtn}
                checked={formData.gender === "남성"}
                onChange={() => handleGenderChange("남성")}
              />
              <span className={styles.checkboxIcon}>
                <Check_IC
                  style={{
                    color: formData.gender === "남성" ? "#5300EC" : "#919191",
                  }}
                />
              </span>
              남성
            </label>
            <label className={`body_18_M ${styles.checkLabel}`}>
              <input
                type="checkbox"
                className={styles.checkBtn}
                checked={formData.gender === "여성"}
                onChange={() => handleGenderChange("여성")}
              />
              <span className={styles.checkboxIcon}>
                <Check_IC
                  style={{
                    color: formData.gender === "여성" ? "#5300EC" : "#919191",
                  }}
                />
              </span>
              여성
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>생년월일</div>
          <div className={styles.birthdateWrapper}>
            <InputBox
              type="text"
              name="birthYear"
              placeholder="YYYY"
              value={formData.birthYear}
              onChange={handleInputChange("birthYear")}
              maxLength={4}
            />
            <InputBox
              type="text"
              name="birthMonth"
              placeholder="MM"
              value={formData.birthMonth}
              onChange={handleInputChange("birthMonth")}
              maxLength={2}
            />
            <InputBox
              type="text"
              name="birthDay"
              placeholder="DD"
              value={formData.birthDay}
              onChange={handleInputChange("birthDay")}
              maxLength={2}
            />
          </div>
        </div>

        <div className={styles.regionSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>주소</div>
          <AddressSelector />
        </div>
      </div>
    </div>
  );
}
