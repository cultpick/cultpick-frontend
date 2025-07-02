import { ApiConfig, ApiResponse } from "@/types/common";
import { getToken } from "@/utils/authToken";
import {
  ApiError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
  NetworkError,
} from "@/api/error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function request<T>(
  method: string,
  endpoint: string,
  config: ApiConfig = {},
): Promise<T> {
  const { body, headers = {}, ssr = false, bypass = false } = config;

  // Next.js API 라우트는 상대 경로로 호출
  const url = endpoint.startsWith("/api/")
    ? endpoint
    : `${BASE_URL}${endpoint}`;
  const tokens = getToken(ssr);

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (!bypass && tokens.accessToken) {
    requestHeaders.Authorization = `Bearer ${tokens.accessToken}`;
  }

  const options: RequestInit = {
    method,
    headers: requestHeaders,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();

      switch (response.status) {
        case 400:
          throw new BadRequestError(errorMessage || "잘못된 요청입니다.");
        case 401:
          throw new UnauthorizedError(errorMessage || "인증이 필요합니다.");
        case 403:
          throw new ForbiddenError(errorMessage || "접근이 거부되었습니다.");
        case 404:
          throw new NotFoundError(
            errorMessage || "요청한 리소스를 찾을 수 없습니다.",
          );
        case 500:
          throw new InternalServerError(
            errorMessage || "서버 오류가 발생했습니다.",
          );
        default:
          throw new ApiError(
            response.status,
            errorMessage || "알 수 없는 오류가 발생했습니다.",
          );
      }
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError("네트워크 오류가 발생했습니다.");
  }
}

export const get = <T>(endpoint: string, config?: ApiConfig) =>
  request<T>("GET", endpoint, config);

export const post = <T>(endpoint: string, config?: ApiConfig) =>
  request<T>("POST", endpoint, config);

export const put = <T>(endpoint: string, config?: ApiConfig) =>
  request<T>("PUT", endpoint, config);

export const del = <T>(endpoint: string, config?: ApiConfig) =>
  request<T>("DELETE", endpoint, config);

export const patch = <T>(endpoint: string, config?: ApiConfig) =>
  request<T>("PATCH", endpoint, config);

// SSR용 API 요청
export const getSsr = <T>(endpoint: string, config?: ApiConfig) =>
  request<T>("GET", endpoint, { ...config, ssr: true });
