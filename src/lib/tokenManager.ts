import axios from 'axios';

interface TokenResponse {
  token: string;
}

class TokenManager {
  /**
   * 토큰을 가져오는 메서드
   * 쿠키 기반 인증을 사용하므로 서버에서 토큰을 가져옴
   */
  public async getToken(): Promise<string> {
    try {
      const response = await fetch('/api/auth/token');
      const data: TokenResponse = await response.json();
      return data.token;
    } catch (error) {
      console.error('Failed to fetch token:', error);
      throw error;
    }
  }
  
  /**
   * 토큰 유효성 검사
   */
  public async validateToken(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/check');
      return response.ok;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }
  
  /**
   * 로그아웃 처리
   */
  public async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }
  
  /**
   * API 요청 인터셉터 설정
   * 401 에러 발생 시 로그인 페이지로 리다이렉트
   */
  public setupInterceptors(axiosInstance: typeof axios): void {
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // 로그인 페이지로 리다이렉트
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
}

// 싱글톤 인스턴스 생성
const tokenManager = new TokenManager();

export default tokenManager;