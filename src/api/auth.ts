import { getToken } from "@/utils/authToken";

class AuthAPI {
  /**
   * 액세스 토큰 갱신
   * TODO: 백엔드에서 refresh 토큰 기능 개발 완료 시 활성화
   */
  async refreshAccessToken(): Promise<void> {
    // 백엔드에서 refresh 토큰 기능이 개발되지 않아 비활성화
    console.warn(
      "Refresh token functionality is not implemented in backend yet",
    );
    throw new Error("Refresh token functionality is not available");

    /*
    try {
      const tokens = getToken(false); // 클라이언트에서만 실행

      if (!tokens.refreshToken) {
        throw new Error("Refresh token not found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: tokens.refreshToken,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();

      // 새로운 토큰을 쿠키에 저장
      if (data.accessToken) {
        document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=lax`;
      }

      if (data.refreshToken) {
        document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; samesite=lax`;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    }
    */
  }

  /**
   * 로그아웃 처리
   */
  async logout(): Promise<void> {
    try {
      // 서버에 로그아웃 요청
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // 클라이언트에서 토큰 제거
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}

export const authAPI = new AuthAPI();
