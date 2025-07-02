"use client";

import { useRecoilValue } from "recoil";
import { loginState } from "@/states/client/atoms";

// 토큰 키 상수
const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

// 로컬 스토리지 API
const storageAPI = {
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },
  set: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

// 로그인 상태 확인 (CSR)
export const useIsLoginCsr = () => {
  const userInfo = useRecoilValue(loginState);
  return userInfo.email !== "";
};

// 토큰 가져오기
export function getToken(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  const accessToken = storageAPI.get(TOKEN_KEYS.ACCESS_TOKEN);
  const refreshToken = storageAPI.get(TOKEN_KEYS.REFRESH_TOKEN);
  return { accessToken, refreshToken };
}

// 토큰 설정
export function setToken(tokens: {
  accessToken?: string;
  refreshToken?: string;
}): void {
  storageAPI.set(TOKEN_KEYS.ACCESS_TOKEN, tokens.accessToken ?? "");
  storageAPI.set(TOKEN_KEYS.REFRESH_TOKEN, tokens.refreshToken ?? "");
}

// 액세스 토큰 업데이트
export function updateToken(accessToken: string): void {
  storageAPI.set(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
}

// 토큰 삭제
export function deleteToken(): void {
  storageAPI.remove(TOKEN_KEYS.ACCESS_TOKEN);
  storageAPI.remove(TOKEN_KEYS.REFRESH_TOKEN);
}

// 쿠키에서 accessToken 확인하는 함수
export function isLoggedIn(): boolean {
  if (typeof document === "undefined") return false;
  const cookies = document.cookie.split(";");
  return cookies.some((cookie) => cookie.trim().startsWith("accessToken="));
}

// 액세스 토큰 설정
export function setAccessToken(at: string): void {
  storageAPI.set(TOKEN_KEYS.ACCESS_TOKEN, at ?? "");
}
