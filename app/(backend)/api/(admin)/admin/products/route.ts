import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      50,
    );
    const filter: Record<string, unknown> = {};
    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: escapedSearch, $options: "i" };
    }

    if (category && category !== "all") {
      const categoryDoc = await Category.findOne({ slug: category }).select(
        "_id",
      );

      if (!categoryDoc) {
        return NextResponse.json({
          success: true,
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 },
        });
      }

      filter.categoryId = categoryDoc._id;
    }

    if (status === "inStock") {
      filter.inStock = true;
    } else if (status === "outOfStock") {
      filter.inStock = false;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("categoryId", "name slug")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
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
    console.error("GET ADMIN PRODUCTS ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Không thể lấy sản phẩm" },
      { status: 500 },
    );
  }
}
