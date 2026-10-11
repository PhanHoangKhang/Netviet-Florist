import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { withRBAC } from "@/lib/auth/withRBAC";

type CategoryUpdates = {
  name?: string;
  slug?: string;
  description?: string;
};

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

function isDuplicateKeyError(
  error: unknown,
): error is { code: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status },
  );
}

// GET: Lấy chi tiết một danh mục
export const GET = withRBAC(
  "categories:read",
  async (_request, context) => {
    try {
      const { id } = await context.params;

      if (!isValidId(id)) {
        return errorResponse("ID danh mục không hợp lệ.", 400);
      }

      await connectDB();

      const category = await Category.findById(id).lean();

      if (!category) {
        return errorResponse("Không tìm thấy danh mục.", 404);
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

      return errorResponse(
        "Không thể lấy thông tin danh mục.",
        500,
      );
    }
  },
);

// PATCH: Cập nhật danh mục
export const PATCH = withRBAC(
  "categories:manage",
  async (request: NextRequest, context) => {
    try {
      const { id } = await context.params;

      if (!isValidId(id)) {
        return errorResponse("ID danh mục không hợp lệ.", 400);
      }

      let body: {
        name?: unknown;
        slug?: unknown;
        description?: unknown;
      };

      try {
        body = await request.json();
      } catch {
        return errorResponse("JSON request không hợp lệ.", 400);
      }

      if (
        typeof body !== "object" ||
        body === null ||
        Array.isArray(body)
      ) {
        return errorResponse("Dữ liệu gửi lên không hợp lệ.", 400);
      }

      const updates: CategoryUpdates = {};

      // Validate name
      if (body.name !== undefined) {
        if (
          typeof body.name !== "string" ||
          !body.name.trim()
        ) {
          return errorResponse("Tên danh mục không hợp lệ.", 400);
        }

        const name = body.name.trim();

        if (name.length > 100) {
          return errorResponse("Tên tối đa 100 ký tự.", 400);
        }

        updates.name = name;
      }

      // Validate slug
      if (body.slug !== undefined) {
        if (typeof body.slug !== "string") {
          return errorResponse("Slug không hợp lệ.", 400);
        }

        const slug = body.slug.trim();

        if (
          slug.length === 0 ||
          slug.length > 120 ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
        ) {
          return errorResponse(
            "Slug phải chứa chữ thường, số hoặc dấu gạch ngang; tối đa 120 ký tự.",
            400,
          );
        }

        updates.slug = slug;
      }

      // Validate description
      if (body.description !== undefined) {
        if (typeof body.description !== "string") {
          return errorResponse("Mô tả không hợp lệ.", 400);
        }

        const description = body.description.trim();

        if (description.length > 1000) {
          return errorResponse("Mô tả tối đa 1000 ký tự.", 400);
        }

        updates.description = description;
      }

      if (Object.keys(updates).length === 0) {
        return errorResponse(
          "Không có thông tin nào để cập nhật.",
          400,
        );
      }

      await connectDB();

      const category = await Category.findById(id);

      if (!category) {
        return errorResponse("Không tìm thấy danh mục.", 404);
      }

      // Kiểm tra slug trùng với danh mục khác
      if (updates.slug !== undefined) {
        const existingCategory = await Category.findOne({
          slug: updates.slug,
          _id: { $ne: category._id },
        }).lean();

        if (existingCategory) {
          return errorResponse(
            "Slug danh mục đã tồn tại.",
            409,
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
      if (isDuplicateKeyError(error)) {
        return errorResponse("Slug danh mục đã tồn tại.", 409);
      }

      console.error("UPDATE CATEGORY ERROR:", error);

      return errorResponse(
        "Không thể cập nhật danh mục.",
        500,
      );
    }
  },
);

// DELETE: Xóa danh mục
export const DELETE = withRBAC(
  "categories:manage",
  async (_request, context) => {
    try {
      const { id } = await context.params;

      if (!isValidId(id)) {
        return errorResponse("ID danh mục không hợp lệ.", 400);
      }

      await connectDB();

      const category = await Category.findById(id);

      if (!category) {
        return errorResponse("Không tìm thấy danh mục.", 404);
      }

      // Không xóa danh mục vẫn đang được sản phẩm sử dụng
      const productCount = await Product.countDocuments({
        categoryId: category._id,
      });

      if (productCount > 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Không thể xóa vì danh mục đang có ${productCount} sản phẩm. Hãy chuyển sản phẩm sang danh mục khác trước.`,
          },
          { status: 409 },
        );
      }

      await Category.findByIdAndDelete(category._id);

      return NextResponse.json({
        success: true,
        message: "Xóa danh mục thành công.",
      });
    } catch (error) {
      console.error("DELETE CATEGORY ERROR:", error);

      return errorResponse(
        "Không thể xóa danh mục.",
        500,
      );
    }
  },
);