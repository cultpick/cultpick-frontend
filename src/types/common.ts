// 공통 API 타입들
export type ApiMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiConfig {
  tags?: string[];
  body?: Record<string, any>;
  headers?: Record<string, string>;
  ssr?: boolean;
  bypass?: boolean;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

// 공통 API 응답 타입
export interface ApiResponse {
  status: "SUCCESS" | "FAIL";
  errorMsg?: string;
  data?: any;
}
