import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { withRBAC } from "@/lib/auth/withRBAC";

export const runtime = "nodejs";

export const GET = withRBAC(
  "products:read",
  async (request: NextRequest, { admin }) => {
    try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const page = Math.max(Number(searchParams.get("page")) || 1, 1);
      const limit = Math.min(
        Math.max(Number(searchParams.get("limit")) || 10, 1),
        50,
      );
      const filter: Record<string, unknown> = {};
      const search = searchParams.get("search")?.trim();
      const category = searchParams.get("category");
      const status = searchParams.get("status");

      if (search) {
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.name = { $regex: escapedSearch, $options: "i" };
      }

      if (category && category !== "all") {
        const categoryDoc = await Category.findOne({ slug: category }).select(
          "_id",
        );

        if (!categoryDoc) {
          return NextResponse.json({
            success: true,
            data: [],
            pagination: { page, limit, total: 0, totalPages: 0 },
          });
        }

        filter.categoryId = categoryDoc._id;
      }

      if (status === "inStock") {
        filter.inStock = true;
      } else if (status === "outOfStock") {
        filter.inStock = false;
      }

      const [products, total] = await Promise.all([
        Product.find(filter)
          .populate("categoryId", "name slug")
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
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
      console.error("GET ADMIN PRODUCTS ERROR:", error);

      return NextResponse.json(
        { success: false, message: "Không thể lấy sản phẩm" },
        { status: 500 },
      );
    }
  },
);

export const POST = withRBAC(
  "products:create",
  async (request: NextRequest, { admin }) => {
    try {
      await connectDB();

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

      if (
        typeof name !== "string" ||
        !name.trim() ||
        name.trim().length > 150 ||
        typeof slug !== "string" ||
        !slug.trim() ||
        slug.trim().length > 180
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Tên sản phẩm hoặc slug không hợp lệ.",
          },
          { status: 400 },
        );
      }

      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return NextResponse.json(
          {
            success: false,
            message: "Danh mục không hợp lệ.",
          },
          { status: 400 },
        );
      }

      if (
        !Array.isArray(images) ||
        images.length < 1 ||
        images.length > 5 ||
        !images.every(
          (image: unknown) =>
            typeof image === "string" && image.startsWith("https://"),
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Sản phẩm cần từ 1 đến 5 URL ảnh hợp lệ.",
          },
          { status: 400 },
        );
      }

      if (
        !Array.isArray(imagePublicIds) ||
        imagePublicIds.length !== images.length ||
        !imagePublicIds.every(
          (publicId: unknown) =>
            typeof publicId === "string" &&
            publicId.startsWith("netviet-florist/products/"),
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Thông tin ảnh Cloudinary không hợp lệ.",
          },
          { status: 400 },
        );
      }

      const category = await Category.findById(categoryId).select("_id");

      if (!category) {
        return NextResponse.json(
          {
            success: false,
            message: "Không tìm thấy danh mục.",
          },
          { status: 404 },
        );
      }

      const normalizedSlug = slug.trim();

      const existingProduct = await Product.findOne({
        slug: normalizedSlug,
      }).select("_id");

      if (existingProduct) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug này đã được sử dụng.",
          },
          { status: 409 },
        );
      }

      const product = await Product.create({
        name: name.trim(),
        slug: normalizedSlug,
        description:
          typeof description === "string"
            ? description.trim().slice(0, 5000)
            : "",
        categoryId,
        images,
        imagePublicIds,
        isFeatured: isFeatured === true,
        inStock: inStock !== false,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Tạo sản phẩm thành công.",
          data: product,
        },
        { status: 201 },
      );
    } catch (error) {
      console.error("CREATE ADMIN PRODUCT ERROR:", error);

      if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug này đã được sử dụng.",
          },
          { status: 409 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Không thể tạo sản phẩm.",
        },
        { status: 500 },
      );
    }
  },
);
