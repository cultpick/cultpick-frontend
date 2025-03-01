import { useState, useEffect } from "react";
import { z } from "zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/registerSchema";
import styles from "./RegisterForm.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import Check_IC from "@/../public/svgs/check_icon.svg";
import AddressSelector from "./Agree/AddressSelector";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "남성",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    address: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    try {
      registerSchema.parse(formData);
      setErrors({});
      setIsValid(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof RegisterFormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        setIsValid(false);
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange =
    (field: keyof RegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // 숫자 필드의 경우 숫자만 입력 가능하도록
      if (["birthYear", "birthMonth", "birthDay"].includes(field)) {
        value = value.replace(/\D/g, "");
        if (field === "birthYear" && value.length > 4) return;
        if (["birthMonth", "birthDay"].includes(field) && value.length > 2)
          return;
      }

      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleGenderChange = (value: "남성" | "여성") => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("Form submitted with:", formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
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
          <div className={styles.inputWrapper}>
            <InputBox
              type="password"
              name="password"
              placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합의 8~20자 입력"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={!!errors.password}
            />
          </div>
          {errors.password && (
            <div className={`caption ${styles.error}`}>{errors.password}</div>
          )}

          <div className={styles.inputWrapper}>
            <InputBox
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={!!errors.confirmPassword}
            />
          </div>
          {errors.confirmPassword && (
            <div className={`caption ${styles.error}`}>
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>이름</div>
          <InputBox
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleInputChange("name")}
            error={!!errors.name}
          />
          {errors.name && (
            <div className={`caption ${styles.error}`}>{errors.name}</div>
          )}
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
          {errors.gender && (
            <div className={`caption ${styles.error}`}>{errors.gender}</div>
          )}
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
              error={!!errors.birthYear}
            />
            <InputBox
              type="text"
              name="birthMonth"
              placeholder="MM"
              value={formData.birthMonth}
              onChange={handleInputChange("birthMonth")}
              maxLength={2}
              error={!!errors.birthMonth}
            />
            <InputBox
              type="text"
              name="birthDay"
              placeholder="DD"
              value={formData.birthDay}
              onChange={handleInputChange("birthDay")}
              maxLength={2}
              error={!!errors.birthDay}
            />
          </div>
          {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
            <div className={`caption ${styles.error}`}>
              {errors.birthYear || errors.birthMonth || errors.birthDay}
            </div>
          )}
        </div>

        <div className={styles.regionSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>주소</div>
          <AddressSelector />
          {errors.address && (
            <div className={`caption ${styles.error}`}>{errors.address}</div>
          )}
        </div>

        <div className={styles.btnWrapper}>
          <Button text="가입하기" state={isValid ? "active" : "disabled"} />
        </div>
      </form>
    </div>
  );
}
