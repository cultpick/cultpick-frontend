import { atom } from "recoil";
import { z } from "zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/registerSchema";

// 전체 동의 상태를 관리할 atom
export const isAllCheckedState = atom({
  key: "isAllCheckedState",
  default: false,
});

// 이용약관 체크 상태를 관리할 atom
export const isTermsCheckedState = atom({
  key: "isTermsCheckedState",
  default: false,
});

// 개인정보 수집 및 이용 체크 상태를 관리할 atom
export const isPrivacyCheckedState = atom({
  key: "isPrivacyCheckedState",
  default: false,
});

// 회원가입 폼 상태
export const registerFormState = atom<RegisterFormData>({
  key: "registerFormState",
  default: {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "남성",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    address: "",
  },
});

export const verificationTokenState = atom<string>({
  key: "verificationTokenState",
  default: "",
});

export const registerFormIsValidState = atom<boolean>({
  key: "registerFormIsValidState",
  default: false,
});

export const registerFormErrorsState = atom<
  Partial<Record<keyof RegisterFormData, string>>
>({
  key: "registerFormErrorsState",
  default: {},
});
