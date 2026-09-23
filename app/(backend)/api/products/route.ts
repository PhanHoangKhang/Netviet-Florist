import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {
      inStock: true,
    };

    /* =========================
       FILTER BY CATEGORY
    ========================= */

    if (category && category !== "all") {
      const categoryDoc = await Category.findOne({
        slug: category,
      }).select("_id");

      if (!categoryDoc) {
        return NextResponse.json({
          success: true,
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        });
      }

      filter.categoryId = categoryDoc._id;
    }

    /* =========================
       SEARCH BY PRODUCT NAME
    ========================= */

    if (search?.trim()) {
      filter.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    /* =========================
       QUERY PRODUCTS
    ========================= */

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
      { status: 500 }
    );
  }
}