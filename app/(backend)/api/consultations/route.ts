
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { sendConsultationNotificationEmail } from "@/lib/sendEmailNotification";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    let body: {
      name?: unknown;
      phone?: unknown;
      note?: unknown;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Dữ liệu gửi lên không hợp lệ.",
        },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { success: false, message: "Dữ liệu không hợp lệ." },
        { status: 400 }
      );
    }

    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const phone =
      typeof body.phone === "string" ? body.phone.trim() : "";
    const note =
      typeof body.note === "string" ? body.note.trim() : "";

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng nhập tên và số điện thoại.",
        },
        { status: 400 }
      );
    }

    if (name.length > 100 || phone.length > 30 || note.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          message: "Thông tin vượt quá độ dài cho phép.",
        },
        { status: 400 }
      );
    }

    // Chấp nhận số điện thoại có dấu +, khoảng trắng hoặc dấu gạch
    if (!/^[0-9+\s().-]{8,30}$/.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Số điện thoại không hợp lệ.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const consultation = await Consultation.create({
      name,
      phone,
      note,
      status: "new",
    });

    // Email là tác vụ thông báo phụ:
    // email lỗi không làm mất yêu cầu đã lưu.
    const emailResult = await sendConsultationNotificationEmail({
      name: consultation.name,
      phone: consultation.phone,
      note: consultation.note,
      createdAt: consultation.createdAt,
    });

    if (!emailResult.success) {
      console.error(
        "Consultation saved, but notification email failed:",
        String(consultation._id)
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Gửi yêu cầu tư vấn thành công.",
        data: {
          id: consultation._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE CONSULTATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể gửi yêu cầu. Vui lòng thử lại.",
      },
      { status: 500 }
    );
  }
}
