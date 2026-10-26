
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AuditLog from "@/models/AuditLog";
import { withRBAC } from "@/lib/auth/withRBAC";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_ACTIONS = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "ACCESS_DENIED",
] as const;

const ALLOWED_STATUSES = ["SUCCESS", "FAILURE"] as const;

const ALLOWED_RESOURCES = [
  "Product",
  "Category",
  "Order",
  "Admin",
  "Authentication",
  "Upload",
  "Notification",
] as const;

function parseDate(value: string | null, endOfDay = false) {
  if (!value) return null;

  // Expect YYYY-MM-DD, avoiding ambiguous date formats.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(
    `${value}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}Z`,
  );

  if (Number.isNaN(date.getTime())) return null;

  // Reject impossible dates such as 2026-02-31.
  if (date.toISOString().slice(0, 10) !== value) return null;

  return date;
}

export const GET = withRBAC(
  "audit-logs:read",
  async (request: NextRequest) => {
    try {
      await connectDB();

      const params = request.nextUrl.searchParams;

      const page = Math.max(
        1,
        Math.min(100000, Number(params.get("page")) || 1),
      );

      const limit = Math.min(
        100,
        Math.max(1, Number(params.get("limit")) || 20),
      );

      const search = (params.get("search") ?? "").trim().slice(0, 100);
      const action = params.get("action") ?? "";
      const resource = params.get("resource") ?? "";
      const status = params.get("status") ?? "";

      const fromValue = params.get("from");
      const toValue = params.get("to");

      const from = parseDate(fromValue);
      const to = parseDate(toValue, true);

      if (fromValue && !from) {
        return NextResponse.json(
          { success: false, message: "Ngày bắt đầu không hợp lệ." },
          { status: 400 },
        );
      }

      if (toValue && !to) {
        return NextResponse.json(
          { success: false, message: "Ngày kết thúc không hợp lệ." },
          { status: 400 },
        );
      }

      if (from && to && from > to) {
        return NextResponse.json(
          {
            success: false,
            message: "Ngày bắt đầu không được sau ngày kết thúc.",
          },
          { status: 400 },
        );
      }

      if (
        action &&
        !ALLOWED_ACTIONS.includes(
          action as (typeof ALLOWED_ACTIONS)[number],
        )
      ) {
        return NextResponse.json(
          { success: false, message: "Action không hợp lệ." },
          { status: 400 },
        );
      }

      if (
        status &&
        !ALLOWED_STATUSES.includes(
          status as (typeof ALLOWED_STATUSES)[number],
        )
      ) {
        return NextResponse.json(
          { success: false, message: "Status không hợp lệ." },
          { status: 400 },
        );
      }

      if (
        resource &&
        !ALLOWED_RESOURCES.includes(
          resource as (typeof ALLOWED_RESOURCES)[number],
        )
      ) {
        return NextResponse.json(
          { success: false, message: "Resource không hợp lệ." },
          { status: 400 },
        );
      }

      const filter: Record<string, unknown> = {};

      if (action) filter.action = action;
      if (resource) filter.resource = resource;
      if (status) filter.status = status;

      if (from || to) {
        const createdAt: Record<string, Date> = {};

        if (from) createdAt.$gte = from;
        if (to) createdAt.$lte = to;

        filter.createdAt = createdAt;
      }

      if (search) {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escaped, "i");

        filter.$or = [
          { actorEmail: regex },
          { description: regex },
          { resourceId: regex },
        ];
      }

      const skip = (page - 1) * limit;

      const [logs, total] = await Promise.all([
        AuditLog.find(filter)
          .select(
            "actorId actorEmail actorRole action resource resourceId description changes status createdAt",
          )
          .sort({ createdAt: -1, _id: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        AuditLog.countDocuments(filter),
      ]);

      return NextResponse.json(
        {
          success: true,
          data: logs,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        {
          headers: {
            "Cache-Control": "private, no-store",
          },
        },
      );
    } catch (error) {
      console.error("[AUDIT_LOGS_GET]", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể tải lịch sử hoạt động.",
        },
        { status: 500 },
      );
    }
  },
);
