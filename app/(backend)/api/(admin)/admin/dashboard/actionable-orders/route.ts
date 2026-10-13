import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { withRBAC } from "@/lib/auth/withRBAC";

export const GET = withRBAC(
  "orders:read",
  async () => {
    try {
      await connectDB();

      const orders = await Order.aggregate([
        {
          $match: {
            status: { $in: ["pending", "confirmed"] },
          },
        },
        {
          $addFields: {
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
      ]);

      return NextResponse.json({
        success: true,
        data: orders.map((order) => ({
          id: order._id.toString(),
          customerName: order.customerName,
          phoneNumber: order.phoneNumber,
          occasion: order.occasion,
          quantity: order.quantity,
          deliveryDate: order.deliveryDate ?? null,
          status: order.status,
          createdAt: order.createdAt,
        })),
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
  },
);