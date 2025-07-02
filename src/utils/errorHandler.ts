import {
  ApiError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
  NetworkError,
} from "@/api/error";

/**
 * 에러 타입을 확인하는 함수들
 */
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const isUnauthorizedError = (
  error: unknown,
): error is UnauthorizedError => {
  return error instanceof UnauthorizedError;
};

export const isForbiddenError = (error: unknown): error is ForbiddenError => {
  return error instanceof ForbiddenError;
};

export const isNotFoundError = (error: unknown): error is NotFoundError => {
  return error instanceof NotFoundError;
};

export const isBadRequestError = (error: unknown): error is BadRequestError => {
  return error instanceof BadRequestError;
};

export const isInternalServerError = (
  error: unknown,
): error is InternalServerError => {
  return error instanceof InternalServerError;
};

export const isNetworkError = (error: unknown): error is NetworkError => {
  return error instanceof NetworkError;
};

/**
 * 에러 상태 코드에 따른 분류
 */
export const getErrorCategory = (error: unknown): string => {
  if (isApiError(error)) {
    if (error.status >= 400 && error.status < 500) {
      return "client_error";
    } else if (error.status >= 500) {
      return "server_error";
    }
  }
  return "unknown_error";
};

/**
 * 에러 메시지를 사용자 친화적으로 변환
 */
export const getUserFriendlyMessage = (error: unknown): string => {
  if (isApiError(error)) {
    switch (error.status) {
      case 400:
        return "입력한 정보를 확인해주세요.";
      case 401:
        return "로그인이 필요합니다.";
      case 403:
        return "접근 권한이 없습니다.";
      case 404:
        return "요청한 정보를 찾을 수 없습니다.";
      case 409:
        return "이미 존재하는 정보입니다.";
      case 422:
        return "입력값이 올바르지 않습니다.";
      case 429:
        return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
      case 500:
        return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      default:
        return error.message || "알 수 없는 오류가 발생했습니다.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
};

/**
 * 에러 로깅
 */
export const logError = (error: unknown, context?: string): void => {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context || "API Error"}]`, error);
  }

  // 프로덕션에서는 에러 추적 서비스로 전송
  if (process.env.NODE_ENV === "production") {
    // TODO: Sentry, LogRocket 등의 에러 추적 서비스 연동
    console.error("Production Error:", error);
  }
};

/**
 * 에러 처리 래퍼 함수
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof UnauthorizedError) {
    // 401 에러 처리 - 로그인 페이지로 리다이렉션
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return "로그인이 필요합니다.";
  }

  if (error instanceof ForbiddenError) {
    return "접근 권한이 없습니다.";
  }

  if (error instanceof NotFoundError) {
    return "요청한 리소스를 찾을 수 없습니다.";
  }

  if (error instanceof BadRequestError) {
    return "잘못된 요청입니다.";
  }

  if (error instanceof InternalServerError) {
    return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }

  if (error instanceof NetworkError) {
    return "네트워크 연결을 확인해주세요.";
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
};

export const getErrorStatus = (error: unknown): number => {
  if (error instanceof ApiError) {
    return error.status;
  }
  return 0;
};
