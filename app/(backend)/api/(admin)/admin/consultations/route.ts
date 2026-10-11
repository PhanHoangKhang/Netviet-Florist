
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() ?? "";
    const status = searchParams.get("status") ?? "";
    const page = Math.max(
      1,
      Number.parseInt(searchParams.get("page") ?? "1", 10) || 1
    );

    const limit = 20;

    const filter: Record<string, unknown> = {};

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { phone: { $regex: escaped, $options: "i" } },
        { note: { $regex: escaped, $options: "i" } },
      ];
    }

    if (["new", "contacted", "closed"].includes(status)) {
      filter.status = status;
    }

    const [items, total] = await Promise.all([
      Consultation.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Consultation.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET CONSULTATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy danh sách yêu cầu tư vấn.",
      },
      { status: 500 }
    );
  }
}
