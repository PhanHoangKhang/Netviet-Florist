import "server-only";

import {
  NextRequest,
  NextResponse,
} from "next/server";

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

type AdminHandler = (
  request: NextRequest,
  context: AdminContext,
) => Promise<NextResponse> | NextResponse;

export function withRBAC(
  permission: AdminPermission,
  handler: AdminHandler,
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // 1. Xác thực session.
      const admin = await getAdminFromRequest(request);

      if (!admin) {
        return NextResponse.json(
          { message: "Vui lòng đăng nhập." },
          { status: 401 },
        );
      }

      // 2. Kiểm tra role.
      if (!hasPermission(admin.role, permission)) {
        return NextResponse.json(
          {
            message: "Bạn không có quyền thực hiện thao tác này.",
          },
          { status: 403 },
        );
      }

      // 3. Chỉ thực thi nghiệp vụ khi đã được cấp quyền.
      return await handler(request, {
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role as AdminRole,
        },
      });
    } catch (error) {
      console.error("RBAC authorization failed:", error);

      return NextResponse.json(
        { message: "Đã xảy ra lỗi khi xử lý yêu cầu." },
        { status: 500 },
      );
    }
  };
}