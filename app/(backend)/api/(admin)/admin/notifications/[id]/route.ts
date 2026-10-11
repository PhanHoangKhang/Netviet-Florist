import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { withRBAC } from "@/lib/auth/withRBAC";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export const PATCH = withRBAC(
  "notifications:update",
  async (_request, context) => {
    try {
      await connectDB();

      const { id } = await context.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          {
            success: false,
            message: "Notification ID không hợp lệ",
          },
          {
            status: 400,
          },
        );
      }

      const notification = await Notification.findByIdAndUpdate(
        id,
        {
          isRead: true,
        },
        {
          new: true,
        },
      ).lean();

      if (!notification) {
        return NextResponse.json(
          {
            success: false,
            message: "Không tìm thấy notification",
          },
          {
            status: 404,
          },
        );
      }

      return NextResponse.json({
        success: true,
        data: notification,
      });
    } catch (error) {
      console.error("MARK NOTIFICATION ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể cập nhật thông báo",
        },
        {
          status: 500,
        },
      );
    }
  },
);

export const DELETE = withRBAC(
  "notifications:delete",
  async (_request, context) => {
    try {
      await connectDB();

      const { id } = await context.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          {
            success: false,
            message: "Notification ID không hợp lệ",
          },
          {
            status: 400,
          },
        );
      }

      const notification = await Notification.findByIdAndDelete(id).lean();

      if (!notification) {
        return NextResponse.json(
          {
            success: false,
            message: "Không tìm thấy notification",
          },
          {
            status: 404,
          },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Đã xóa notification",
        data: notification,
      });
    } catch (error) {
      console.error("DELETE NOTIFICATION ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể xóa thông báo",
        },
        {
          status: 500,
        },
      );
    }
  },
);
