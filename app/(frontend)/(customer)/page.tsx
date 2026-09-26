"use client";

import { useEffect, useState } from "react";

import Category from "@/components/Category";
import HeroSlider from "@/components/HeroSlider";
import ValuePropsSection from "@/components/ValuePropsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProductSlider from "@/components/ProductSlider";

import type { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/products?limit=50");

        if (!response.ok) {
          throw new Error("Không thể lấy sản phẩm");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Không thể lấy sản phẩm");
        }

        setProducts(result.data);
      } catch (error) {
        console.error("FETCH HOME PRODUCTS ERROR:", error);
        setError("Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Best Seller
  const bestSellers = products.filter(
    (product) => product.isFeatured
  );

  // Hoa Bó
  const hoaBoProducts = products.filter(
    (product) => product.categoryId?.slug === "hoa-bo"
  );

  // Hoa Giỏ
  const hoaGioProducts = products.filter(
    (product) => product.categoryId?.slug === "hoa-gio"
  );

  // Lan Hồ Điệp
  const lanHoDiepProducts = products.filter(
    (product) => product.categoryId?.slug === "lan-ho-diep"
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Category />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSlider />
          <ValuePropsSection />
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-gray-500">
            Đang tải sản phẩm...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-16 text-center text-red-500">
            {error}
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            {/* SECTION 1: Best Seller */}
            <ProductSlider
              title="MẪU HOA BÁN CHẠY NHẤT"
              subtitle="Những mẫu hoa được đông đảo khách hàng tin chọn tại Nét Việt Florist"
              products={bestSellers}
              onSelectProduct={setSelectedProduct}
            />

            {/* SECTION 2: Hoa Bó */}
            <ProductSlider
              title="BỘ SƯU TẬP HOA BÓ"
              subtitle="Thiết kế hiện đại, bó hoa trao gửi cảm xúc"
              products={hoaBoProducts}
              onSelectProduct={setSelectedProduct}
            />

            {/* SECTION 3: Hoa Giỏ */}
            <ProductSlider
              title="HOA GIỎ"
              subtitle="Phù hợp tặng sinh nhật, kỷ niệm, sự kiện đối tác"
              products={hoaGioProducts}
              onSelectProduct={setSelectedProduct}
            />

            {/* SECTION 4: Lan Hồ Điệp */}
            <ProductSlider
              title="LAN HỒ ĐIỆP CAO CẤP"
              subtitle="Chậu lan quý phái, quà tặng khai trương & đối tác đẳng cấp"
              products={lanHoDiepProducts}
              onSelectProduct={setSelectedProduct}
            />
          </>
        )}

        <HowItWorksSection />
      </main>
    </div>
  );
}