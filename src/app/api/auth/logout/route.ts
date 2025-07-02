import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    cookies().delete("accessToken");
    return NextResponse.json({ status: "SUCCESS" });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", errorMsg: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
