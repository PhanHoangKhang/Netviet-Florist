import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
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
}

export async function POST(request: NextRequest) {
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

    if (!name || !slug || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng nhập đầy đủ thông tin sản phẩm.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng thêm ít nhất một hình ảnh.",
        },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug sản phẩm đã tồn tại.",
        },
        { status: 409 }
      );
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Danh mục không tồn tại.",
        },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name: name.trim(),
      slug: slug.trim(),
      description: description?.trim() || "",
      categoryId,
      images,
      imagePublicIds: imagePublicIds || [],
      isFeatured: Boolean(isFeatured),
      inStock: inStock !== false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thêm sản phẩm thành công.",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể tạo sản phẩm.",
      },
      { status: 500 }
    );
  }
}
