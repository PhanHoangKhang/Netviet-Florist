import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import {
  clearAdminSessionCookie,
  getSessionCookieName,
  revokeAdminSession,
} from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(getSessionCookieName())?.value;

    if (token) {
      await connectDB();
      await revokeAdminSession(token);
    }

    const response = NextResponse.json({
      message: "Đã đăng xuất.",
    });

    clearAdminSessionCookie(response);

    return response;
  } catch (error) {
    console.error("Admin logout failed:", error);

    return NextResponse.json(
      { message: "Không thể đăng xuất lúc này." },
      { status: 500 },
    );
  }
}