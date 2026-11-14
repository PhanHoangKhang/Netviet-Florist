
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const [categories, productCounts] = await Promise.all([
      Category.find({})
        .sort({ group: 1, order: 1, createdAt: -1 })
        .lean(),

      // Count products belonging to each category
      Product.aggregate([
        {
          $match: {
            inStock: true,
          },
        },
        {
          $unwind: "$categoryIds",
        },
        {
          $group: {
            _id: "$categoryIds",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Create category product count map
    const countMap = new Map(
      productCounts.map((item) => [
        String(item._id),
        item.count,
      ]),
    );

    // Attach product count to each category
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
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
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
