import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "@/models/Category";
import Product from "@/models/Product";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ========================================
// CATEGORIES
// ========================================

const categories = [
  // =========================================
  // 1. CHỦ ĐỀ
  // =========================================
  {
    name: "Hoa Sinh Nhật",
    slug: "hoa-sinh-nhat",
    group: "topic",
    isFeatured: true,
    order: 1,
  },
  {
    name: "Hoa Khai Trương",
    slug: "hoa-khai-truong",
    group: "topic",
    isFeatured: true,
    order: 2,
  },
  {
    name: "Hoa Chúc Mừng",
    slug: "hoa-chuc-mung",
    group: "topic",
    isFeatured: true,
    order: 3,
  },
  {
    name: "Hoa Chia Buồn",
    slug: "hoa-chia-buon",
    group: "topic",
    isFeatured: true,
    order: 4,
  },

  // =========================================
  // 2. ĐỐI TƯỢNG
  // =========================================
  {
    name: "Hoa Tặng Người Yêu",
    slug: "hoa-tang-nguoi-yeu",
    group: "audience",
    isFeatured: true,
    order: 1,
  },
  {
    name: "Hoa Tặng Mẹ",
    slug: "hoa-tang-me",
    group: "audience",
    isFeatured: true,
    order: 2,
  },
  {
    name: "Hoa Tặng Bạn Bè",
    slug: "hoa-tang-ban-be",
    group: "audience",
    isFeatured: true,
    order: 3,
  },

  // =========================================
  // 3. KIỂU DÁNG
  // =========================================
  {
    name: "Hoa Bó",
    slug: "hoa-bo",
    group: "style",
    isFeatured: true,
    order: 1,
  },
  {
    name: "Hoa Giỏ",
    slug: "hoa-gio",
    group: "style",
    isFeatured: true,
    order: 2,
  },
  {
    name: "Hoa Hộp",
    slug: "hoa-hop",
    group: "style",
    isFeatured: true,
    order: 3,
  },

  // =========================================
  // 4. HOA TƯƠI
  // =========================================
  {
    name: "Hoa Hồng",
    slug: "hoa-hong",
    group: "flower",
    isFeatured: true,
    order: 1,
  },
  {
    name: "Hoa Hướng Dương",
    slug: "hoa-huong-duong",
    group: "flower",
    isFeatured: true,
    order: 2,
  },
  {
    name: "Hoa Đồng Tiền",
    slug: "hoa-dong-tien",
    group: "flower",
    isFeatured: true,
    order: 3,
  },
  {
    name: "Lan Hồ Điệp",
    slug: "lan-ho-diep",
    group: "flower",
    isFeatured: true,
    order: 4,
  },

  // =========================================
  // 5. MÀU SẮC
  // =========================================
  {
    name: "Hoa Đỏ",
    slug: "hoa-do",
    group: "color",
    isFeatured: true,
    order: 1,
  },
  {
    name: "Hoa Trắng",
    slug: "hoa-trang",
    group: "color",
    isFeatured: true,
    order: 2,
  },
  {
    name: "Hoa Màu Hồng",
    slug: "hoa-mau-hong",
    group: "color",
    isFeatured: true,
    order: 3,
  },
] as const;

// ========================================
// PRODUCTS
// ========================================

const products = [
  // Best Sellers
  {
    name: "Bó Hoa Hồng Red Naomi Sang Trọng",
    categoryId: "hoa-bo",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
    isFeatured: true,
  },
  {
    name: "Lẵng Hoa Khai Trương Phát Tài",
    categoryId: "hoa-chuc-mung",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600",
    isFeatured: true,
  },
  {
    name: "Chậu Lan Hồ Điệp Hoàng Kim 5 Cành",
    categoryId: "lan-ho-diep",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600",
    isFeatured: true,
  },
  {
    name: "Giỏ Hoa Tulip Trắng Tinh Khôi",
    categoryId: "hoa-gio",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600",
    isFeatured: true,
  },

  // Hoa Bó
  {
    name: "Bó Hoa Mẫu Đơn Hồng Ngọt Ngào",
    categoryId: "hoa-bo",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600",
    isFeatured: false,
  },
  {
    name: "Bó Hoa Cúc Tana Tinh Khôi",
    categoryId: "hoa-bo",
    image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600",
    isFeatured: false,
  },
  {
    name: "Bó Hoa Hướng Dương Năng Lượng",
    categoryId: "hoa-bo",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600",
    isFeatured: false,
  },
  {
    name: "Bó Hoa Baby Trắng Bồng Bềnh",
    categoryId: "hoa-bo",
    image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600",
    isFeatured: false,
  },

  // Hoa Giỏ
  {
    name: "Giỏ Hoa Hồng Nhập Khẩu Pasteur",
    categoryId: "hoa-gio",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600",
    isFeatured: false,
  },
  {
    name: "Giỏ Hoa Cẩm Tú Cầu Nhã Nhặn",
    categoryId: "hoa-gio",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
    isFeatured: false,
  },
  {
    name: "Lẵng Hoa Cúc Pingpong & Hồng Kem",
    categoryId: "hoa-gio",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600",
    isFeatured: false,
  },

  // Lan Hồ Điệp
  {
    name: "Chậu Lan Hồ Điệp Tím Đại Lộc",
    categoryId: "lan-ho-diep",
    image: "https://images.unsplash.com/photo-1566808902061-68393c042838?w=600",
    isFeatured: false,
  },
  {
    name: "Chậu Lan Hồ Điệp Trắng Đột Biến",
    categoryId: "lan-ho-diep",
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600",
    isFeatured: false,
  },

  // Hoa Chúc Mừng
  {
    name: "Kệ Hoa Khai Trương Hồng Phát 2 Tầng",
    categoryId: "hoa-chuc-mung",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600",
    isFeatured: false,
  },
  {
    name: "Lẵng Hoa Khai Trương Thịnh Vượng",
    categoryId: "hoa-chuc-mung",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600",
    isFeatured: false,
  },
];

// ========================================
// SEED FUNCTION
// ========================================

async function seed() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected!");

    // WARNING: This will delete all existing products and categories.
    console.log("Clearing old data...");

    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log("Old data cleared!");

    // ========================================
    // CREATE CATEGORIES
    // ========================================

    console.log("Creating categories...");

    const createdCategories = await Category.insertMany(
      categories.map((category) => ({
        ...category,
      })),
    );

    console.log(`Created ${createdCategories.length} categories.`);

    // Map category slug to MongoDB ObjectId
    const categoryMap = new Map<string, mongoose.Types.ObjectId>();

    createdCategories.forEach((category) => {
      categoryMap.set(category.slug, category._id);
    });

    // ========================================
    // PREPARE PRODUCTS
    // ========================================

    const productData = products.map((product) => {
      const categoryObjectId = categoryMap.get(product.categoryId);

      if (!categoryObjectId) {
        throw new Error(`Category not found: ${product.categoryId}`);
      }

      return {
        name: product.name,

        slug: createSlug(product.name),

        description: `Sản phẩm ${product.name} được thiết kế từ những loại hoa tươi tuyển chọn, phù hợp làm quà tặng và sử dụng trong các dịp đặc biệt.`,

        // A product can belong to multiple categories
        categoryIds: [categoryObjectId],

        images: [product.image],

        isFeatured: product.isFeatured,

        inStock: true,
      };
    });

    // ========================================
    // CREATE PRODUCTS
    // ========================================

    console.log("Creating products...");

    const createdProducts = await Product.insertMany(productData);

    console.log(`Created ${createdProducts.length} products.`);

    // ========================================
    // SUMMARY
    // ========================================

    console.log("");
    console.log("=================================");
    console.log("        SEED COMPLETED!");
    console.log("=================================");
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`Products:   ${createdProducts.length}`);
    console.log("=================================");
  } catch (error) {
    console.error("SEED ERROR:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();

    console.log("MongoDB disconnected.");
  }
}

seed();
