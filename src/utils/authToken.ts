import { cookies } from "next/headers";

interface Tokens {
  accessToken?: string | null;
  refreshToken?: string | null;
}

/**
 * SSR과 클라이언트 환경에서 토큰을 가져오는 함수
 */
export function getToken(ssr: boolean = false): Tokens {
  if (ssr) {
    // SSR 환경에서는 서버의 쿠키에서 토큰 가져오기
    try {
      // 동적 import로 next/headers 사용
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
      const refreshToken = cookieStore.get("refreshToken")?.value;

      return {
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
      };
    } catch (error) {
      // 쿠키 접근 실패 시 (클라이언트에서 실행된 경우)
      return {
        accessToken: null,
        refreshToken: null,
      };
    }
  } else {
    // 클라이언트 환경에서는 브라우저의 쿠키에서 토큰 가져오기
    if (typeof window === "undefined") {
      return {
        accessToken: null,
        refreshToken: null,
      };
    }

    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
      }
      return null;
    };

    return {
      accessToken: getCookie("accessToken"),
      refreshToken: getCookie("refreshToken"),
    };
  }
}
