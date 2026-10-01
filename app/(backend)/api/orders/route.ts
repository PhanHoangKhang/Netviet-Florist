import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { createNotification } from "@/lib/createNotification";
import { sendOrderNotificationEmail } from "@/lib/sendEmailNotification";
import mongoose from "mongoose";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const orderSchema = z.object({
  productId: z.string().refine(
    (value) => mongoose.isValidObjectId(value),
    {
      message: "Product ID không hợp lệ.",
    }
  ),

  customerName: z
    .string()
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự.")
    .max(100, "Họ tên quá dài."),

  email: z
    .string()
    .trim()
    .email("Email không hợp lệ.")
    .max(254, "Email quá dài."),

  phoneNumber: z
    .string()
    .trim()
    .min(8, "Số điện thoại không hợp lệ.")
    .max(20, "Số điện thoại quá dài."),

  deliveryAddress: z
    .string()
    .trim()
    .min(5, "Địa chỉ quá ngắn.")
    .max(300, "Địa chỉ quá dài."),

  deliveryDate: z
    .string()
    .trim()
    .optional()
    .nullable(),

  occasion: z
    .string()
    .trim()
    .min(1, "Vui lòng chọn dịp tặng.")
    .max(100, "Dịp tặng quá dài."),

  quantity: z.coerce
    .number()
    .int("Số lượng phải là số nguyên.")
    .min(1, "Số lượng phải lớn hơn 0.")
    .max(100, "Số lượng quá lớn."),

  note: z
    .string()
    .trim()
    .max(1000, "Ghi chú quá dài.")
    .optional()
    .default(""),
});

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "all";
    const occasion = searchParams.get("occasion") || "all";
    const date = searchParams.get("date") || "";

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    // =========================
    // STATUS
    // =========================

    if (status !== "all") {
      filter.status = status;
    }

    // =========================
    // OCCASION
    // =========================

    if (occasion !== "all") {
      filter.occasion = occasion;
    }

    // =========================
    // DATE
    // =========================

    if (date) {
      const start = new Date(date);

      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      filter.createdAt = {
        $gte: start,
        $lt: end,
      };
    }

    // =========================
    // SEARCH
    // =========================

    if (search) {
      const searchRegex = new RegExp(search, "i");

      const matchingProducts = await Product.find({
        name: searchRegex,
      })
        .select("_id")
        .lean();

      const productIds = matchingProducts.map(
        (product) => product._id
      );

      filter.$or = [
        { customerName: searchRegex },
        { email: searchRegex },
        { phoneNumber: searchRegex },
        { deliveryAddress: searchRegex },
        { productId: { $in: productIds } },
      ];
    }

    // =========================
    // QUERY
    // =========================

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate(
          "productId",
          "name slug images"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Order.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET ADMIN ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể lấy danh sách đơn hàng.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // ========================================
    // RATE LIMIT
    // ========================================

    const forwardedFor = request.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rate = rateLimit(`orders:${ip}`, {
      limit: 5,
      windowMs: 60 * 1000,
    });

    if (!rate.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Bạn gửi yêu cầu quá nhanh. Vui lòng thử lại sau.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfter),
          },
        }
      );
    }

    // ========================================
    // BODY SIZE CHECK
    // ========================================

    const contentLength = request.headers.get("content-length");

    if (contentLength && Number(contentLength) > 50_000) {
      return NextResponse.json(
        {
          success: false,
          message: "Dữ liệu gửi lên quá lớn.",
        },
        { status: 413 }
      );
    }

    // ========================================
    // PARSE BODY
    // ========================================

    const body = await request.json();

    // ========================================
    // VALIDATION
    // ========================================

    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Thông tin đặt hoa không hợp lệ.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      productId,
      customerName,
      email,
      phoneNumber,
      deliveryAddress,
      deliveryDate,
      occasion,
      quantity,
      note,
    } = result.data;

    // ========================================
    // DATABASE
    // ========================================

    await connectDB();

    // ========================================
    // CHECK PRODUCT
    // ========================================

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy sản phẩm.",
        },
        { status: 404 }
      );
    }

    if (!product.inStock) {
      return NextResponse.json(
        {
          success: false,
          message: "Sản phẩm hiện đã hết hàng.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // CREATE ORDER
    // ========================================

    const order = await Order.create({
      productId: product._id,
      customerName,
      email,
      phoneNumber,
      deliveryAddress,
      deliveryDate: deliveryDate || null,
      occasion,
      quantity,
      note,
      status: "pending",
    });

    // ========================================
    // CREATE NOTIFICATION
    // ========================================

    await createNotification({
      title: "Đơn hàng mới",
      message: `${customerName} vừa gửi yêu cầu đặt hoa.`,
      type: "order",
      orderId: order._id,
    });

    // ========================================
    // SEND EMAIL
    // ========================================

    await sendOrderNotificationEmail({
      customerName: order.customerName,
      email: order.email,
      phoneNumber: order.phoneNumber,
      deliveryAddress: order.deliveryAddress,
      deliveryDate: order.deliveryDate
        ? order.deliveryDate.toISOString().split("T")[0]
        : null,
      occasion: order.occasion,
      quantity: order.quantity,
      note: order.note,
      status: order.status,
      productName: product.name,
    });

    // ========================================
    // RESPONSE
    // ========================================

    return NextResponse.json(
      {
        success: true,
        message: "Yêu cầu đặt hoa đã được gửi thành công.",
        data: order,
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": String(rate.remaining),
        },
      }
    );
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể gửi yêu cầu đặt hoa.",
      },
      { status: 500 }
    );
  }
}