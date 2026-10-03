import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID không hợp lệ.",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(id)
      .populate("categoryId", "name slug")
      .lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy sản phẩm.",
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
        message: "Không thể lấy sản phẩm.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID không hợp lệ.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      name,
      slug,
      description,
      categoryId,
      images,
      imagePublicIds,
      isFeatured,
      inStock,
    } = body;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy sản phẩm.",
        },
        { status: 404 }
      );
    }

    if (slug && slug !== product.slug) {
      const existingProduct = await Product.findOne({
        slug,
        _id: { $ne: id },
      });

      if (existingProduct) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug sản phẩm đã tồn tại.",
          },
          { status: 409 }
        );
      }
    }

    product.name = name?.trim() ?? product.name;
    product.slug = slug?.trim() ?? product.slug;
    product.description =
      description?.trim() ?? product.description;

    if (categoryId) {
      product.categoryId = categoryId;
    }

    if (Array.isArray(images)) {
      product.images = images;
    }

    if (Array.isArray(imagePublicIds)) {
      product.imagePublicIds = imagePublicIds;
    }

    if (typeof isFeatured === "boolean") {
      product.isFeatured = isFeatured;
    }

    if (typeof inStock === "boolean") {
      product.inStock = inStock;
    }

    await product.save();

    return NextResponse.json({
      success: true,
      message: "Cập nhật sản phẩm thành công.",
      data: product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể cập nhật sản phẩm.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID không hợp lệ.",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy sản phẩm.",
        },
        { status: 404 }
      );
    }

    if (product.imagePublicIds?.length) {
      await Promise.all(
        product.imagePublicIds.map((publicId: string) =>
          cloudinary.uploader.destroy(publicId)
        )
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Xóa sản phẩm thành công.",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể xóa sản phẩm.",
      },
      { status: 500 }
    );
  }
}

