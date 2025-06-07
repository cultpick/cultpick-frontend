import { apiRequest, createTokenApiRequest } from "@/lib/apiClient";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
  EmailVerificationValidateRequest,
  EmailVerificationValidateResponse,
} from "./type";

/**
 * 비밀번호 변경
 *
 * @api [PUT] /auth/password
 */
export const updatePassword = async (password: string): Promise<void> => {
  return apiRequest.put<void>("/auth/password", {
    password,
  });
};

/**
 * 로그인
 *
 * @api [POST] /auth/sign-in
 */
export const signIn = async (
  requestData: SignInRequest,
): Promise<SignInResponse> => {
  return apiRequest.post<SignInResponse>("/api/auth/sign-in", requestData);
};

/**
 * 회원가입
 *
 * @api [POST] /auth/sign-up
 */
export const signUp = async (
  requestData: SignUpRequest,
  verificationToken: string,
): Promise<SignUpResponse> => {
  const tokenApi = createTokenApiRequest(verificationToken);
  return tokenApi.post<SignUpResponse>("/auth/sign-up", requestData);
};

/**
 * 로그아웃
 *
 * @api [POST] /auth/logout
 */
export const logout = async (): Promise<void> => {
  const token = localStorage.getItem("accessToken") || "";
  const tokenApi = createTokenApiRequest(token);
  return tokenApi.post<void>("/auth/logout", {});
};

/**
 * 인증번호 이메일 발송
 *
 * @api [POST] /auth/verification
 */
export const sendVerificationEmail = async (
  requestData: EmailVerificationRequest,
): Promise<EmailVerificationResponse> => {
  return apiRequest.post<EmailVerificationResponse>(
    "/auth/verification",
    requestData,
  );
};

/**
 * 인증번호 검증
 *
 * @api [POST] /auth/verification/validate
 */
export const validateVerificationCode = async (
  requestData: EmailVerificationValidateRequest,
): Promise<EmailVerificationValidateResponse> => {
  return apiRequest.post<EmailVerificationValidateResponse>(
    "/auth/verification/validate",
    requestData,
  );
};
