import { NextRequest, NextResponse } from "next/server";

import { getAdminFromRequest } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { message: "Chưa đăng nhập hoặc phiên đã hết hạn." },
        { status: 401 },
      );
    }

    return NextResponse.json({ admin });
  } catch (error) {
    console.error("Admin session check failed:", error);

    return NextResponse.json(
      { message: "Không thể kiểm tra phiên đăng nhập." },
      { status: 500 },
    );
  }
}