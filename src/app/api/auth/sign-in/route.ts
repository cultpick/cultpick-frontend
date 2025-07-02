import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 백엔드 API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    // 응답 생성
    const res = NextResponse.json(
      { status: "SUCCESS", data },
      { status: response.status },
    );

    // 토큰이 있으면 쿠키에 저장
    if (data.accessToken) {
      res.cookies.set({
        name: "accessToken",
        value: data.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return res;
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", errorMsg: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
