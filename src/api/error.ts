export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "인증이 필요합니다.") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "접근 권한이 없습니다.") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "요청한 리소스를 찾을 수 없습니다.") {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "잘못된 요청입니다.") {
    super(400, message);
    this.name = "BadRequestError";
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "서버 오류가 발생했습니다.") {
    super(500, message);
    this.name = "InternalServerError";
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = "네트워크 오류가 발생했습니다.") {
    super(0, message);
    this.name = "NetworkError";
  }
}

// 추가적인 에러 클래스들
export class ConflictError extends ApiError {
  constructor(message: string = "요청이 충돌했습니다.") {
    super(409, message);
    this.name = "ConflictError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "입력값이 유효하지 않습니다.") {
    super(422, message);
    this.name = "ValidationError";
  }
}

export class RateLimitError extends ApiError {
  constructor(
    message: string = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  ) {
    super(429, message);
    this.name = "RateLimitError";
  }
}
