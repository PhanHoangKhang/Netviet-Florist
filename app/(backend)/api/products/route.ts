import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {
      inStock: true,
    };

    // Filter category
    if (category && category !== "all") {
      filter.categoryId = category;
    }

    // Search product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("categoryId", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy sản phẩm",
      },
      { status: 500 },
    );
  }
}