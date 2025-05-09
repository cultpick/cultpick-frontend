import axios from "axios";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "./type";
import { Sign } from "crypto";

/**
 * 회원가입
 *
 * @api [POST] /auth/sign-up
 */
export const signUp = async (
  requestData: SignUpRequest,
): Promise<SignUpResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
    requestData,
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
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
    requestData,
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
