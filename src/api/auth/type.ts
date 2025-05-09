import { RegisterFormData } from "@/schemas/registerSchema";

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  addressCode?: string;
  favoriteCategoryCodes: string[];
}

export interface SignUpResponse {
  id: string;
  email: string;
  name: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface FormattedSignUpData {
  formData: RegisterFormData;
  selectedCategoryCodes: string[];
  addressData: any;
  verificationToken: string;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationResponse {
  success: boolean;
}

export interface EmailVerificationValidateRequest {
  email: string;
  code: string;
}

export interface EmailVerificationValidateResponse {
  verificationToken: string;
}
