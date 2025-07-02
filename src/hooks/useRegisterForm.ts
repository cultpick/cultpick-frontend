"use client";

import { useEffect } from "react";
import { z } from "zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/registerSchema";
import { useRecoilState } from "recoil";
import {
  registerFormState,
  registerFormErrorsState,
  registerFormIsValidState,
} from "@/states/client/registerAtoms";

export const useRegisterForm = () => {
  const [formData, setFormData] = useRecoilState(registerFormState);
  const [errors, setErrors] = useRecoilState(registerFormErrorsState);
  const [isValid, setIsValid] = useRecoilState(registerFormIsValidState);

  // 폼 데이터가 변경될 때마다 유효성 검사
  useEffect(() => {
    console.log("Form Data:", formData);
    const requiredFields = [
      "email",
      "password",
      "confirmPassword",
      "name",
      "gender",
      "birthYear",
      "birthMonth",
      "birthDay",
      "address",
    ];
    const emptyRequiredFields = Object.entries(formData).filter(
      ([key, value]) => {
        if (!requiredFields.includes(key)) return false;
        let isEmpty = !value || value === "";

        // 주소의 경우 시/군/구까지 선택되었는지 확인
        if (key === "address" && value) {
          const addressParts = value.split(" ");
          isEmpty = addressParts.length < 2; // 시/군/구가 선택되지 않은 경우
        }

        console.log(`Field ${key}:`, value, "isEmpty:", isEmpty);
        return isEmpty;
      },
    );

    const hasEmptyRequiredFields = emptyRequiredFields.length > 0;
    console.log("Empty Required Fields:", emptyRequiredFields);
    console.log("Has Empty Required Fields:", hasEmptyRequiredFields);

    if (hasEmptyRequiredFields) {
      console.log("Setting isValid to false due to empty required fields");
      setIsValid(false);
      return;
    }

    try {
      registerSchema.parse(formData);
      console.log("Schema validation passed, setting isValid to true");
      setIsValid(true);
    } catch (error) {
      console.log("Schema validation failed:", error);
      setIsValid(false);
    }
  }, [formData, setIsValid]);

  // 에러 상태 관리를 위한 유효성 검사
  useEffect(() => {
    try {
      registerSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof RegisterFormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  }, [formData, setErrors]);

  const handleInputChange =
    (field: keyof RegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

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

  const getErrorMessages = () => {
    const emailError = errors.email;
    const passwordError = errors.password;
    const confirmPasswordError = errors.confirmPassword;

    if (passwordError) {
      return [passwordError];
    }

    if (confirmPasswordError) {
      return [confirmPasswordError];
    }

    return [];
  };

  return {
    formData,
    errors,
    isValid,
    handleInputChange,
    handleGenderChange,
    getErrorMessages,
    emailError: errors.email,
  };
};
