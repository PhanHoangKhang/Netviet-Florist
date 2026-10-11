import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Host-netviet-admin-session"
      : "netviet-admin-session";

  const sessionToken = request.cookies.get(cookieName)?.value;

  // Chưa có cookie thì chuyển về login.
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  // Có cookie thì cho qua lớp kiểm tra sớm.
  // Server-side guard vẫn phải xác thực session thực sự.
  return NextResponse.next();
}

export const config = {
  matcher: ["/netviet-admin/:path*"],
};