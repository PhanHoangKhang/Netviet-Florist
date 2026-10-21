import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { withRBAC } from "@/lib/auth/withRBAC";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { s3, S3_BUCKET } from "@/lib/s3";
import Category from "@/models/Category";

export const GET = withRBAC("products:read", async (_request, context) => {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Product ID không hợp lệ." },
        { status: 400 },
      );
    }

    const product = await Product.findById(id)
      .populate("categoryId", "name slug")
      .lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sản phẩm." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GET PRODUCT DETAIL ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Không thể lấy sản phẩm." },
      { status: 500 },
    );
  }
});


export const PATCH = withRBAC(
  "products:update",
  async (request, context) => {
    try {
      await connectDB();

      const { id } = await context.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, message: "Product ID không hợp lệ." },
          { status: 400 },
        );
      }

      const body = await request.json();

      const {
        name,
        slug,
        description,
        categoryId,
        images,
        imageKeys,
        isFeatured,
        inStock,
      } = body;

      const product = await Product.findById(id);

      if (!product) {
        return NextResponse.json(
          { success: false, message: "Không tìm thấy sản phẩm." },
          { status: 404 },
        );
      }

      // Validate basic fields
      if (
        name !== undefined &&
        (typeof name !== "string" ||
          !name.trim() ||
          name.trim().length > 150)
      ) {
        return NextResponse.json(
          { success: false, message: "Tên sản phẩm không hợp lệ." },
          { status: 400 },
        );
      }

      if (
        slug !== undefined &&
        (typeof slug !== "string" ||
          !slug.trim() ||
          slug.trim().length > 180)
      ) {
        return NextResponse.json(
          { success: false, message: "Slug sản phẩm không hợp lệ." },
          { status: 400 },
        );
      }

      if (
        description !== undefined &&
        typeof description !== "string"
      ) {
        return NextResponse.json(
          { success: false, message: "Mô tả không hợp lệ." },
          { status: 400 },
        );
      }

      if (slug !== undefined && slug.trim() !== product.slug) {
        const normalizedSlug = slug.trim();

        const existingProduct = await Product.findOne({
          slug: normalizedSlug,
          _id: { $ne: id },
        }).select("_id");

        if (existingProduct) {
          return NextResponse.json(
            { success: false, message: "Slug sản phẩm đã tồn tại." },
            { status: 409 },
          );
        }
      }

      // Validate category
      if (categoryId !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
          return NextResponse.json(
            { success: false, message: "Danh mục không hợp lệ." },
            { status: 400 },
          );
        }

        const categoryExists = await Category.findById(categoryId)
          .select("_id")
          .lean();

        if (!categoryExists) {
          return NextResponse.json(
            { success: false, message: "Không tìm thấy danh mục." },
            { status: 404 },
          );
        }

        product.categoryId = categoryExists._id;
      }

      // Update basic fields
      if (name !== undefined) product.name = name.trim();
      if (slug !== undefined) product.slug = slug.trim();

      if (description !== undefined) {
        product.description = description.trim().slice(0, 5000);
      }

      // Validate and update image pair
      if (images !== undefined || imageKeys !== undefined) {
        if (
          !Array.isArray(images) ||
          !Array.isArray(imageKeys) ||
          images.length < 1 ||
          images.length > 5 ||
          images.length !== imageKeys.length
        ) {
          return NextResponse.json(
            { success: false, message: "Danh sách ảnh không hợp lệ." },
            { status: 400 },
          );
        }

        const domain = process.env.CLOUDFRONT_DOMAIN?.replace(/\/+$/, "");

        if (!domain) {
          console.error("CLOUDFRONT_DOMAIN is not configured.");

          return NextResponse.json(
            { success: false, message: "Cấu hình ảnh chưa sẵn sàng." },
            { status: 500 },
          );
        }

        const validKeys = imageKeys.every(
          (key: unknown) =>
            typeof key === "string" &&
            /^products\/[a-f0-9-]+\.webp$/i.test(key),
        );

        const uniqueKeys =
          new Set(imageKeys).size === imageKeys.length;

        const validUrls = images.every(
          (url: unknown, index: number) => {
            if (typeof url !== "string") return false;

            const expectedUrl =
              `${domain}/${(imageKeys[index] as string)
                .split("/")
                .map(encodeURIComponent)
                .join("/")}`;

            return url === expectedUrl;
          },
        );

        if (!validKeys || !uniqueKeys || !validUrls) {
          return NextResponse.json(
            { success: false, message: "Thông tin ảnh không hợp lệ." },
            { status: 400 },
          );
        }

        product.images = images;
        product.imageKeys = imageKeys;
      }

      if (isFeatured !== undefined) {
        if (typeof isFeatured !== "boolean") {
          return NextResponse.json(
            { success: false, message: "Trạng thái nổi bật không hợp lệ." },
            { status: 400 },
          );
        }

        product.isFeatured = isFeatured;
      }

      if (inStock !== undefined) {
        if (typeof inStock !== "boolean") {
          return NextResponse.json(
            { success: false, message: "Trạng thái tồn kho không hợp lệ." },
            { status: 400 },
          );
        }

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

      if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
      ) {
        return NextResponse.json(
          { success: false, message: "Slug sản phẩm đã tồn tại." },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { success: false, message: "Không thể cập nhật sản phẩm." },
        { status: 500 },
      );
    }
  },
);


export const DELETE = withRBAC("products:delete", async (request, context) => {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Product ID không hợp lệ." },
        { status: 400 },
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sản phẩm." },
        { status: 404 },
      );
    }

    const imageKeys: string[] = Array.isArray(product.imageKeys)
      ? product.imageKeys.filter(
          (key: unknown): key is string =>
            typeof key === "string" &&
            /^products\/[a-f0-9-]+\.webp$/i.test(key),
        )
      : [];

    if (imageKeys.length > 0) {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: S3_BUCKET,
          Delete: {
            Objects: imageKeys.map((Key) => ({ Key })),
            Quiet: true,
          },
        }),
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
      { success: false, message: "Không thể xóa sản phẩm." },
      { status: 500 },
    );
  }
});
