import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { withRBAC } from "@/lib/auth/withRBAC";

export const runtime = "nodejs";

export const GET = withRBAC("categories:read", async () => {
  try {
    await connectDB();

    const categories = await Category.find({}).sort({ createdAt: -1 }).lean();

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
      productCounts.map((item) => [String(item._id), item.count]),
    );

    const data = categories.map((category) => ({
      ...category,
      productCount: countMap.get(String(category._id)) ?? 0,
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Không thể lấy danh sách danh mục." },
      { status: 500 },
    );
  }
});

export const POST = withRBAC(
  "categories:manage",
  async (request: NextRequest) => {
    try {
      await connectDB();

      const body = await request.json();
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const slug = typeof body.slug === "string" ? body.slug.trim() : "";
      const image = typeof body.image === "string" ? body.image : "";
      const imageKey = typeof body.imageKey === "string" ? body.imageKey : "";
      const description =
        typeof body.description === "string" ? body.description.trim() : "";

      if (!name || !slug) {
        return NextResponse.json(
          {
            success: false,
            message: "Tên và slug danh mục không được để trống.",
          },
          { status: 400 },
        );
      }

      if (name.length > 100 || slug.length > 120) {
        return NextResponse.json(
          {
            success: false,
            message: "Tên tối đa 100 ký tự, slug tối đa 120 ký tự.",
          },
          { status: 400 },
        );
      }

      if (description.length > 1000) {
        return NextResponse.json(
          {
            success: false,
            message: "Mô tả không được vượt quá 1000 ký tự.",
          },
          { status: 400 },
        );
      }

      // Chỉ chấp nhận slug dạng: hoa-sinh-nhat
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang.",
          },
          { status: 400 },
        );
      }

      const existingCategory = await Category.findOne({ slug }).lean();

      if (existingCategory) {
        return NextResponse.json(
          { success: false, message: "Slug danh mục đã tồn tại." },
          { status: 409 },
        );
      }

      const domain = process.env.CLOUDFRONT_DOMAIN?.replace(/\/+$/, "");

      const validImageKey = /^categories\/[a-f0-9-]+\.webp$/i.test(imageKey);

      const expectedImageUrl =
        domain && validImageKey
          ? `${domain}/${imageKey.split("/").map(encodeURIComponent).join("/")}`
          : "";

      if (!domain || !validImageKey || image !== expectedImageUrl) {
        return NextResponse.json(
          {
            success: false,
            message: "Vui lòng upload ảnh danh mục hợp lệ.",
          },
          { status: 400 },
        );
      }

      const category = await Category.create({
        name,
        slug,
        description,
        image,
        imageKey,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Thêm danh mục thành công.",
          data: category,
        },
        { status: 201 },
      );
    } catch (error: unknown) {
      // Xử lý trường hợp hai request tạo cùng slug gần như đồng thời
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000
      ) {
        return NextResponse.json(
          { success: false, message: "Slug danh mục đã tồn tại." },
          { status: 409 },
        );
      }

      console.error("CREATE CATEGORY ERROR:", error);

      return NextResponse.json(
        { success: false, message: "Không thể tạo danh mục." },
        { status: 500 },
      );
    }
  },
);
