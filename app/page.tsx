"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import LeadModal from "@/components/LeadModal";
import Category from "@/components/Category";
import HeroSlider from "@/components/HeroSlider";

// Mock dữ liệu sản phẩm mẫu tương ứng với các category id
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Giỏ Trái Cây Cao Cấp",
    categoryId: "trai-cay",
    category: "Trái cây",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600",
  },
  {
    id: "2",
    name: "Hoa Cầm Tay Cô Dâu",
    categoryId: "hoa-cuoi",
    category: "Hoa cưới",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600",
  },
  {
    id: "3",
    name: "Chậu Lan Hồ Điệp Tím",
    categoryId: "lan-ho-diep",
    category: "Lan hồ điệp",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600",
  },
  {
    id: "4",
    name: "Kệ Hoa Khai Trương Hồng Phát",
    categoryId: "hoa-chuc-mung",
    category: "Hoa chúc mừng",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600",
  },
  {
    id: "5",
    name: "Giỏ Hoa Hồng Nhập Khẩu",
    categoryId: "hoa-gio",
    category: "Hoa giỏ",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600",
  },
  {
    id: "6",
    name: "Bó Hoa Mẫu Đơn Hồng",
    categoryId: "hoa-bo",
    category: "Hoa bó",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600",
  },
];

export default function Home() {
  // State lưu category đang chọn (mặc định là 'all')
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Lọc sản phẩm theo category được chọn
  const filteredProducts =
    selectedCategory === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter(
          (product) => product.categoryId === selectedCategory,
        );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-light)]">
      <Navbar />

      <main className="flex-1">
        {/* Thanh Category Tab Bar */}
        <Category />

        {/* Hero Slider */}
        <div className="my-4">
          <HeroSlider />
        </div>

        {/* Danh sách sản phẩm */}
        <section className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              Chưa có sản phẩm nào thuộc danh mục này.
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Form đăng ký nhận tư vấn Popup */}
      <LeadModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
