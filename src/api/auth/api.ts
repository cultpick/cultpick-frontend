import axios from "axios";
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
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password`,
    {
      password,
    },
  );

  return data;
};

/**
 * 로그인
 *
 * @api [POST] /auth/sign-in
 */
export const signIn = async (
  requestData: SignInRequest,
): Promise<SignInResponse> => {
  const { data } = await axios.post("/api/auth/sign-in", requestData);

  return data;
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
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${verificationToken}`,
      },
    },
  );

  return data;
};

/**
 * 로그아웃
 *
 * @api [POST] /auth/logout
 */
export const logout = async (): Promise<void> => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );
};

/**
 * 인증번호 이메일 발송
 *
 * @api [POST] /auth/verification
 */
export const sendVerificationEmail = async (
  requestData: EmailVerificationRequest,
): Promise<EmailVerificationResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verification`,
    requestData,
  );

  return data;
};

/**
 * 인증번호 검증
 *
 * @api [POST] /auth/verification/validate
 */
export const validateVerificationCode = async (
  requestData: EmailVerificationValidateRequest,
): Promise<EmailVerificationValidateResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verification/validate`,
    requestData,
  );

  return data;
};
