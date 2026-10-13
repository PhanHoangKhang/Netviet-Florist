import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { withRBAC } from "@/lib/auth/withRBAC";

export const GET = withRBAC(
  "orders:read",
  async () => {
    try {
      await connectDB();

      // Dùng timezone Việt Nam để xác định ngày hiện tại.
      const now = new Date();
      const vietnamDate = new Date(
        now.toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
      );

      const startOfToday = new Date(vietnamDate);
      startOfToday.setHours(0, 0, 0, 0);

      // Chuyển mốc giờ Việt Nam về UTC để truy vấn MongoDB.
      const offset = 7 * 60 * 60 * 1000;
      const startUtc = new Date(
        startOfToday.getTime() - offset,
      );
      const endUtc = new Date(
        startUtc.getTime() + 24 * 60 * 60 * 1000,
      );

      const [
        ordersToday,
        pendingOrders,
        totalProducts,
        orderValueResult,
      ] = await Promise.all([
        Order.countDocuments({
          createdAt: {
            $gte: startUtc,
            $lt: endUtc,
          },
        }),

        Order.countDocuments({
          status: "pending",
        }),

        Product.countDocuments({}),

        Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startUtc,
                $lt: endUtc,
              },
              status: { $ne: "cancelled" },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$totalAmount" },
            },
          },
        ]),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          ordersToday,
          orderValueToday: orderValueResult[0]?.total ?? 0,
          pendingOrders,
          totalProducts,
        },
      });
    } catch (error) {
      console.error("DASHBOARD OVERVIEW ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể tải dữ liệu dashboard.",
        },
        { status: 500 },
      );
    }
  },
);
