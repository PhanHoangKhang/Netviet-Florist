import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";

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
    await connectDB();

    const body = await request.json();

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
    } = body;

    // =========================
    // VALIDATION
    // =========================

    if (
      !productId ||
      !customerName ||
      !email ||
      !phoneNumber ||
      !deliveryAddress ||
      !occasion ||
      !quantity
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng điền đầy đủ thông tin.",
        },
        { status: 400 }
      );
    }

    // =========================
    // CHECK PRODUCT
    // =========================

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

    // =========================
    // CREATE ORDER
    // =========================

    const order = await Order.create({
      productId: product._id,
      customerName,
      email,
      phoneNumber,
      deliveryAddress,
      deliveryDate: deliveryDate || null,
      occasion,
      quantity: Number(quantity),
      note: note || "",
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Yêu cầu đặt hoa đã được gửi thành công.",
        data: {
          orderId: order._id.toString(),
        },
      },
      { status: 201 }
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