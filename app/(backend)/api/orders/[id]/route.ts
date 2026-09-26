import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

const VALID_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID không hợp lệ.",
        },
        { status: 400 }
      );
    }

    const order = await Order.findById(id)
      .populate(
        "productId",
        "name slug images description"
      )
      .lean();

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy đơn hàng.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("GET ORDER DETAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy thông tin đơn hàng.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    // =========================
    // VALIDATE ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID không hợp lệ.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { status } = body;

    // =========================
    // VALIDATE STATUS
    // =========================

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Trạng thái đơn hàng không hợp lệ.",
        },
        { status: 400 }
      );
    }

    // =========================
    // FIND ORDER
    // =========================

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy đơn hàng.",
        },
        { status: 404 }
      );
    }

    // =========================
    // UPDATE STATUS
    // =========================

    order.status = status;

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công.",
      data: order,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể cập nhật đơn hàng.",
      },
      {
        status: 500,
      }
    );
  }
}