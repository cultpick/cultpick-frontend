import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const hasValidToken = request.cookies.has("accessToken");

  return NextResponse.json({ isLoggedIn: hasValidToken });
}
