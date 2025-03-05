"use client";

import { atom } from "recoil";
import { z } from "zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/registerSchema";

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

export const registerFormErrorsState = atom<
  Partial<Record<keyof RegisterFormData, string>>
>({
  key: "registerFormErrorsState",
  default: {},
});

export const registerFormIsValidState = atom<boolean>({
  key: "registerFormIsValidState",
  default: false,
});
