import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { withRBAC } from "@/lib/auth/withRBAC";

export const GET = withRBAC("notifications:read", async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const unreadCount = await Notification.countDocuments({
      isRead: false,
    });

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy thông báo",
      },
      {
        status: 500,
      },
    );
  }
});

export const PATCH = withRBAC(
  "notifications:read",
  async () => {
    try {
      await connectDB();

      await Notification.updateMany(
        { isRead: false },
        { isRead: true },
      );

      return NextResponse.json({
        success: true,
        message: "Đã đánh dấu tất cả thông báo là đã đọc",
      });
    } catch (error) {
      console.error("MARK ALL NOTIFICATIONS ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể đánh dấu tất cả thông báo đã đọc",
        },
        { status: 500 },
      );
    }
  },
);
