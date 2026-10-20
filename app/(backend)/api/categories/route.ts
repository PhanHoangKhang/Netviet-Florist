import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    // Đếm số sản phẩm trong từng danh mục
    const productCounts = await Product.aggregate([
      {
        $group: {
          _id: "$categoryId",
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map(
      productCounts.map((item) => [
        String(item._id),
        item.count,
      ]),
    );

    const data = categories.map((category) => ({
      ...category,
      productCount: countMap.get(String(category._id)) ?? 0,
    }));

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy danh mục.",
      },
      { status: 500 },
    );
  }
}