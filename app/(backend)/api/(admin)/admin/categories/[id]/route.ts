import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET: Lấy chi tiết một danh mục
export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "ID danh mục không hợp lệ." },
        { status: 400 }
      );
    }

    await connectDB();

    const category = await Category.findById(id).lean();

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục." },
        { status: 404 }
      );
    }

    const productCount = await Product.countDocuments({
      categoryId: category._id,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...category,
        productCount,
      },
    });
  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Không thể lấy thông tin danh mục." },
      { status: 500 }
    );
  }
}

// PATCH: Cập nhật danh mục
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "ID danh mục không hợp lệ." },
        { status: 400 }
      );
    }

    await connectDB();

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục." },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Chỉ cho phép cập nhật các field được hỗ trợ
    const updates: {
      name?: string;
      slug?: string;
      description?: string;
    } = {};

    if (body.name !== undefined) {
      if (typeof body.name !== "string" || !body.name.trim()) {
        return NextResponse.json(
          { success: false, message: "Tên danh mục không hợp lệ." },
          { status: 400 }
        );
      }

      const name = body.name.trim();

      if (name.length > 100) {
        return NextResponse.json(
          { success: false, message: "Tên tối đa 100 ký tự." },
          { status: 400 }
        );
      }

      updates.name = name;
    }

    if (body.slug !== undefined) {
      if (
        typeof body.slug !== "string" ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug.trim())
      ) {
        return NextResponse.json(
          { success: false, message: "Slug không hợp lệ." },
          { status: 400 }
        );
      }

      const slug = body.slug.trim();

      if (slug.length > 120) {
        return NextResponse.json(
          { success: false, message: "Slug tối đa 120 ký tự." },
          { status: 400 }
        );
      }

      updates.slug = slug
    }

    if (body.description !== undefined) {
      if (typeof body.description !== "string") {
        return NextResponse.json(
          { success: false, message: "Mô tả không hợp lệ." },
          { status: 400 }
        );
      }

      const description = body.description.trim();

      if (description.length > 1000) {
        return NextResponse.json(
          { success: false, message: "Mô tả tối đa 1000 ký tự." },
          { status: 400 }
        );
      }

      updates.description = description
    }

    if (updates.slug) {
      const existingCategory = await Category.findOne({
        slug: updates.slug,
        _id: { $ne: id },
      }).lean();

      if (existingCategory) {
        return NextResponse.json(
          { success: false, message: "Slug danh mục đã tồn tại." },
          { status: 409 }
        );
      }
    }

    Object.assign(category, updates);
    await category.save();

    return NextResponse.json({
      success: true,
      message: "Cập nhật danh mục thành công.",
      data: category,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, message: "Slug danh mục đã tồn tại." },
        { status: 409 }
      );
    }

    console.error("UPDATE CATEGORY ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Không thể cập nhật danh mục." },
      { status: 500 }
    );
  }
}

// DELETE: Xóa danh mục
export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "ID danh mục không hợp lệ." },
        { status: 400 }
      );
    }

    await connectDB();

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục." },
        { status: 404 }
      );
    }

    // Không xóa nếu vẫn còn sản phẩm thuộc danh mục
    const productCount = await Product.countDocuments({
      categoryId: category._id,
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Không thể xóa vì danh mục đang có ${productCount} sản phẩm. Hãy chuyển sản phẩm sang danh mục khác trước.`,
        },
        { status: 409 }
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Xóa danh mục thành công.",
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Không thể xóa danh mục." },
      { status: 500 }
    );
  }
}
