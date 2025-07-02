import { get, post, put, getSsr } from "@/api/client";
import {
  SignInRequest,
  SignUpRequest,
  EmailVerificationRequest,
  EmailVerificationResponse,
  EmailVerificationValidateRequest,
  EmailVerificationValidateResponse,
} from "@/model/auth";
import { SignInResponse, SignUpResponse } from "@/model/user";

/**
 * 로그인 (Next.js API 라우트 사용)
 */
export const signIn = (data: SignInRequest) =>
  post<SignInResponse>("/api/auth/sign-in", { body: data });

/**
 * 로그아웃 (Next.js API 라우트 사용)
 */
export const logout = () => post("/api/auth/logout");

/**
 * 토큰 확인 (백엔드 API 직접 호출)
 */
export const checkAuth = () => get<{ isLoggedIn: boolean }>("/auth/check");

/**
 * 토큰 가져오기 (Next.js API 라우트 사용)
 */
export const getToken = () => get<{ token: string }>("/api/auth/token");

/**
 * 회원가입 (백엔드 API 직접 호출)
 */
export const signUp = (data: SignUpRequest, verificationToken: string) =>
  post<SignUpResponse>("/auth/sign-up", {
    body: data,
    headers: { Authorization: `Bearer ${verificationToken}` },
  });

/**
 * 비밀번호 변경 (백엔드 API 직접 호출)
 */
export const updatePassword = (password: string) =>
  put("/auth/password", { body: { password } });

/**
 * 인증번호 이메일 발송 (백엔드 API 직접 호출)
 */
export const sendEmailVerification = (data: EmailVerificationRequest) =>
  post<EmailVerificationResponse>("/auth/verification", { body: data });

/**
 * 인증번호 검증 (백엔드 API 직접 호출)
 */
export const verifyEmail = (data: EmailVerificationValidateRequest) =>
  post<EmailVerificationValidateResponse>("/auth/verification/validate", {
    body: data,
  });

/**
 * SSR용 API 함수들
 */
export const signUpSsr = (data: SignUpRequest, verificationToken: string) =>
  getSsr<SignUpResponse>("/auth/sign-up", {
    headers: { Authorization: `Bearer ${verificationToken}` },
  });

export const getPerformanceListSsr = () => getSsr("/performances");
