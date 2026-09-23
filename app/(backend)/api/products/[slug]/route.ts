import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { slug } = await params;

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
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GET PRODUCT DETAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy thông tin sản phẩm",
      },
      { status: 500 }
    );
  }
}