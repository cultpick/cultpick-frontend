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
} from "@/store/registerState";

export const useRegisterForm = () => {
  const [formData, setFormData] = useRecoilState(registerFormState);
  const [errors, setErrors] = useRecoilState(registerFormErrorsState);
  const [isValid, setIsValid] = useRecoilState(registerFormIsValidState);

  const validateForm = () => {
    const isAllFieldsFilled = Object.values(formData).every(
      (value) => value !== "",
    );

    if (!isAllFieldsFilled) {
      setIsValid(false);
      return;
    }

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
