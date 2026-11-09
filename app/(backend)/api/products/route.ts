import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Query parameters
    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search")?.trim() || "";

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      50,
    );

    const skip = (page - 1) * limit;

    // Base filter: only available products
    const filter: Record<string, any> = {
      inStock: true,
    };

    // FILTER BY CATEGORY
    if (category === "featured") {
      filter.isFeatured = true;
    } else if (category !== "all") {
      const categoryDoc = await Category.findOne({
        slug: category,
      })
        .select("_id")
        .lean();

      // Category does not exist
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

    // SEARCH BY PRODUCT NAME, DESCRIPTION AND CATEGORY
    if (search) {
      // Escape special Regex characters
      const escapedKeyword = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Find matching categories
      const matchedCategories = await Category.find({
        name: {
          $regex: escapedKeyword,
          $options: "i",
        },
      })
        .select("_id")
        .lean();

      const categoryIds = matchedCategories.map((category) => category._id);

      filter.$or = [
        // Search product name
        {
          name: {
            $regex: escapedKeyword,
            $options: "i",
          },
        },

        // Search product description
        {
          description: {
            $regex: escapedKeyword,
            $options: "i",
          },
        },

        // Search by category name
        {
          categoryId: {
            $in: categoryIds,
          },
        },
      ];
    }

    // QUERY PRODUCTS AND TOTAL COUNT
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("categoryId", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),
    ]);

    // RESPONSE
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
