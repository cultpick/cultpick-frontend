import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value || "";

    return NextResponse.json({
      status: "SUCCESS",
      data: { token },
    });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", errorMsg: "토큰 가져오기 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
