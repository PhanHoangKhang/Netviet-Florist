import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { withRBAC } from "@/lib/auth/withRBAC";

export const GET = withRBAC("orders:read", async () => {
  try {
    await connectDB();

    const [result] = await Order.aggregate([
      {
        $match: {
          status: {
            $in: ["pending", "confirmed"],
          },
        },
      },

      {
        $facet: {
          // =========================
          // TOP 6 ACTIONABLE ORDERS
          // =========================

          orders: [
            {
              $addFields: {
                statusPriority: {
                  $cond: [
                    { $eq: ["$status", "pending"] },
                    0,
                    1,
                  ],
                },

                deliverySortDate: {
                  $ifNull: [
                    "$deliveryDate",
                    new Date("9999-12-31T00:00:00.000Z"),
                  ],
                },
              },
            },

            {
              $sort: {
                statusPriority: 1,
                deliverySortDate: 1,
                createdAt: -1,
              },
            },

            { $limit: 6 },

            {
              $project: {
                customerName: 1,
                phoneNumber: 1,
                occasion: 1,
                quantity: 1,
                deliveryDate: 1,
                status: 1,
                createdAt: 1,
              },
            },
          ],

          // =========================
          // TOTAL COUNTS
          // =========================

          stats: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },

            {
              $group: {
                _id: null,

                pendingCount: {
                  $sum: {
                    $cond: [
                      { $eq: ["$_id", "pending"] },
                      "$count",
                      0,
                    ],
                  },
                },

                confirmedCount: {
                  $sum: {
                    $cond: [
                      { $eq: ["$_id", "confirmed"] },
                      "$count",
                      0,
                    ],
                  },
                },
              },
            },

            {
              $project: {
                _id: 0,
                pendingCount: 1,
                confirmedCount: 1,
              },
            },
          ],
        },
      },
    ]);

    const stats = result?.stats?.[0] ?? {
      pendingCount: 0,
      confirmedCount: 0,
    };

    const orders = result?.orders ?? [];

    return NextResponse.json({
      success: true,

      data: orders.map((order: any) => ({
        id: order._id.toString(),
        customerName: order.customerName,
        phoneNumber: order.phoneNumber,
        occasion: order.occasion,
        quantity: order.quantity,
        deliveryDate: order.deliveryDate ?? null,
        status: order.status,
        createdAt: order.createdAt,
      })),

      counts: {
        pending: stats.pendingCount,
        confirmed: stats.confirmedCount,
        total: stats.pendingCount + stats.confirmedCount,
      },
    });
  } catch (error) {
    console.error("DASHBOARD ACTIONABLE ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách đơn hàng cần xử lý.",
      },
      { status: 500 },
    );
  }
});