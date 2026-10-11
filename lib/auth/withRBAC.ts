import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth/session";
import {
  hasPermission,
  type AdminPermission,
  type AdminRole,
} from "@/lib/auth/permissions";

export type AuthenticatedAdmin = {
  id: string;
  email: string;
  role: AdminRole;
};

type AdminContext = {
  admin: AuthenticatedAdmin;
};

type RouteContext = {
  params: Promise<Record<string, string>>;
};

type AdminHandler = (
  request: NextRequest,
  context: RouteContext & AdminContext,
) => Promise<NextResponse> | NextResponse;

export function withRBAC(
  permission: AdminPermission,
  handler: AdminHandler,
) {
  return async (
    request: NextRequest,
    routeContext: RouteContext,
  ): Promise<NextResponse> => {
    // 1. Xác thực session
    let sessionAdmin;

    try {
      sessionAdmin = await getAdminFromRequest(request);
    } catch (error) {
      console.error("ADMIN AUTHENTICATION ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể xác thực phiên đăng nhập.",
        },
        { status: 500 },
      );
    }

    // 2. Chưa đăng nhập hoặc session không hợp lệ
    if (!sessionAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng đăng nhập.",
        },
        { status: 401 },
      );
    }

    // 3. Kiểm tra quyền
    if (!hasPermission(sessionAdmin.role, permission)) {
      return NextResponse.json(
        {
          success: false,
          message: "Bạn không có quyền thực hiện thao tác này.",
        },
        { status: 403 },
      );
    }

    // 4. Chạy handler nghiệp vụ
    return handler(request, {
      ...routeContext,
      admin: {
        id: sessionAdmin.id,
        email: sessionAdmin.email,
        role: sessionAdmin.role as AdminRole,
      },
    });
  };
}