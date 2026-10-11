import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/auth/password";
import {
  createAdminSession,
  setAdminSessionCookie,
} from "@/lib/auth/session";
import AdminUser from "@/models/AdminUser";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      !("password" in body) ||
      typeof body.email !== "string" ||
      typeof body.password !== "string"
    ) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không hợp lệ." },
        { status: 400 },
      );
    }

    const email = body.email.trim().toLowerCase();
    const password = body.password;

    if (
      email.length > 254 ||
      password.length === 0 ||
      password.length > 1024
    ) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không hợp lệ." },
        { status: 400 },
      );
    }

    await connectDB();

    const admin = await AdminUser.findOne({
      email,
      status: "active",
    }).select("+passwordHash");

    // Dùng chung thông báo để không tiết lộ email nào tồn tại.
    if (
      !admin ||
      !(await verifyPassword(admin.passwordHash, password))
    ) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không chính xác." },
        { status: 401 },
      );
    }

    const { token, expiresAt } = await createAdminSession(
      admin._id.toString(),
    );

    admin.lastLoginAt = new Date();
    await admin.save();

    const response = NextResponse.json({
      message: "Đăng nhập thành công.",
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
    });

    setAdminSessionCookie(response, token, expiresAt);

    return response;
  } catch (error) {
    console.error("Admin login failed:", error);

    return NextResponse.json(
      { message: "Đã xảy ra lỗi. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}