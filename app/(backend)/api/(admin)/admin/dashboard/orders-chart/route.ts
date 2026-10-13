
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { withRBAC } from "@/lib/auth/withRBAC";

const TIME_ZONE = "Asia/Ho_Chi_Minh";
const DAY_MS = 24 * 60 * 60 * 1000;
const VN_OFFSET_MS = 7 * 60 * 60 * 1000;

function isValidDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

// Múi giờ Việt Nam là UTC+7.
function vietnamMidnightToUTC(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(
    Date.UTC(year, month - 1, day) - VN_OFFSET_MS,
  );
}

function addDays(dateString: string, days: number) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function getTodayInVietnam() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export const GET = withRBAC(
  "orders:read",
  async (request: NextRequest) => {
    try {
      const today = getTodayInVietnam();
      const params = request.nextUrl.searchParams;

      const to = params.get("to") ?? today;
      const from = params.get("from") ?? addDays(today, -6);

      if (
        !isValidDateString(from) ||
        !isValidDateString(to) ||
        from > to
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Khoảng ngày không hợp lệ.",
          },
          { status: 400 },
        );
      }

      const startMs = Date.parse(`${from}T00:00:00Z`);
      const endMs = Date.parse(`${to}T00:00:00Z`);
      const days = Math.round((endMs - startMs) / DAY_MS) + 1;

      if (days > 366) {
        return NextResponse.json(
          {
            success: false,
            message: "Chỉ hỗ trợ thống kê tối đa 366 ngày mỗi lần.",
          },
          { status: 400 },
        );
      }

      const startDate = vietnamMidnightToUTC(from);
      const endDate = vietnamMidnightToUTC(addDays(to, 1));

      await connectDB();

      const groupedOrders = await Order.aggregate<{
        _id: string;
        count: number;
      }>([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: TIME_ZONE,
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const countByDate = new Map(
        groupedOrders.map((item) => [item._id, item.count]),
      );

      const data = Array.from({ length: days }, (_, index) => {
        const date = addDays(from, index);

        return {
          date,
          orders: countByDate.get(date) ?? 0,
        };
      });

      return NextResponse.json({
        success: true,
        data: {
          from,
          to,
          totalOrders: data.reduce(
            (total, item) => total + item.orders,
            0,
          ),
          points: data,
        },
      });
    } catch (error) {
      console.error("DASHBOARD ORDERS CHART ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể tải biểu đồ đơn hàng.",
        },
        { status: 500 },
      );
    }
  },
);