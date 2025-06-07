import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import tokenManager from './tokenManager';

// 기본 API 클라이언트 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * 기본 API 요청 함수 (인증 불필요)
 */
export const apiRequest = {
  get: async <T>(url: string, params?: any): Promise<T> => {
    const { data } = await apiClient.get<T>(url, { params });
    return data;
  },

  post: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await apiClient.post<T>(url, body);
    return data;
  },

  put: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await apiClient.put<T>(url, body);
    return data;
  },

  delete: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await apiClient.delete<T>(url, { data: body });
    return data;
  }
};

/**
 * 인증이 필요한 API 요청 함수
 */
export const authApiRequest = {
  get: async <T>(url: string, params?: any): Promise<T> => {
    const token = await tokenManager.getToken();
    const { data } = await apiClient.get<T>(url, { 
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },

  post: async <T>(url: string, body?: any): Promise<T> => {
    const token = await tokenManager.getToken();
    const { data } = await apiClient.post<T>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },

  put: async <T>(url: string, body?: any): Promise<T> => {
    const token = await tokenManager.getToken();
    const { data } = await apiClient.put<T>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },

  delete: async <T>(url: string, body?: any): Promise<T> => {
    const token = await tokenManager.getToken();
    const { data } = await apiClient.delete<T>(url, { 
      data: body,
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }
};

/**
 * 특정 토큰을 사용하는 API 요청 함수
 */
export const createTokenApiRequest = (token: string) => ({
  get: async <T>(url: string, params?: any): Promise<T> => {
    const { data } = await apiClient.get<T>(url, { 
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },

  post: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await apiClient.post<T>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },

  put: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await apiClient.put<T>(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },

  delete: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await apiClient.delete<T>(url, { 
      data: body,
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }
});

export default apiClient;