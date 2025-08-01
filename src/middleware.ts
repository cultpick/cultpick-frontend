import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호된 페이지 목록
const protectedPages = ["/my", "/picklist"];

// 공개 페이지 목록
const publicPages = ["/login", "/register", "/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasValidToken = request.cookies.has("accessToken");

  // API 요청 처리
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 웰컴 페이지 리다이렉트 로직
  if (pathname === "/") {
    const welcomeHiddenUntil = request.cookies.get("welcomeHiddenUntil");

    if (!welcomeHiddenUntil) {
      // 체크하지 않은 사용자는 웰컴 페이지로 이동
      return NextResponse.redirect(new URL("/welcome", request.url));
    }

    try {
      const hiddenDate = new Date(welcomeHiddenUntil.value);
      const currentDate = new Date();

      if (currentDate >= hiddenDate) {
        // 숨김 기간이 지났으므로 쿠키 제거하고 웰컴 페이지로 이동
        const response = NextResponse.redirect(
          new URL("/welcome", request.url),
        );
        response.cookies.delete("welcomeHiddenUntil");
        return response;
      }

      // 숨김 기간이 남아있으면 홈페이지에 머무름
    } catch (error) {
      // 쿠키 파싱 오류 시 웰컴 페이지로 이동
      const response = NextResponse.redirect(new URL("/welcome", request.url));
      response.cookies.delete("welcomeHiddenUntil");
      return response;
    }
  }

  // 페이지 요청 처리
  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page),
  );
  const isPublicPage = publicPages.some((page) => pathname.startsWith(page));

  // 보호된 페이지에 접근하려고 하는데 토큰이 없는 경우
  if (isProtectedPage && !hasValidToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근하려는 경우
  if (
    hasValidToken &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
