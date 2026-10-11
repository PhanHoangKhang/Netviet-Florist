
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "ID yêu cầu không hợp lệ." },
        { status: 400 }
      );
    }

    let body: { status?: unknown };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Dữ liệu không hợp lệ." },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      !["new", "contacted", "closed"].includes(
        String(body.status)
      )
    ) {
      return NextResponse.json(
        { success: false, message: "Trạng thái không hợp lệ." },
        { status: 400 }
      );
    }

    await connectDB();

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { $set: { status: body.status } },
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy yêu cầu tư vấn." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công.",
      data: consultation,
    });
  } catch (error) {
    console.error("UPDATE CONSULTATION ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Không thể cập nhật trạng thái." },
      { status: 500 }
    );
  }
}
