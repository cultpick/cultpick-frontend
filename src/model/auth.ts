export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  addressCode?: string;
  favoriteCategoryCodes: string[];
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
