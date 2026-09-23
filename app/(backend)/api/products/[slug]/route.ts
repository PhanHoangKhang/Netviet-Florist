import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const product = await Product.findOne({
      slug,
      inStock: true,
    })
      .populate("categoryId", "name slug")
      .lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy sản phẩm",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy sản phẩm",
      },
      { status: 500 },
    );
  }
}