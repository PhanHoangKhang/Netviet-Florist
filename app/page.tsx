"use client";

import { useState } from "react";
import Category from "@/components/Category";
import HeroSlider from "@/components/HeroSlider";
import ValuePropsSection from "@/components/ValuePropsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProductSlider from "@/components/ProductSlider";
import LeadModal from "@/components/LeadModal";
import { MOCK_PRODUCTS, type Product } from "@/mock/data";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Lọc dữ liệu theo nhu cầu
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);
  const hoaBoProducts = MOCK_PRODUCTS.filter((p) => p.categoryId === "hoa-bo");
  const hoaGioProducts = MOCK_PRODUCTS.filter(
    (p) => p.categoryId === "hoa-gio",
  );
  const lanHoDiepProducts = MOCK_PRODUCTS.filter(
    (p) => p.categoryId === "lan-ho-diep",
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-light)]">

      <main className="flex-1">
        <Category />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSlider />
          <ValuePropsSection />
        </div>

        {/* SECTION 1: Best Seller */}
        <ProductSlider
          title="Mẫu Hoa Bán Chạy Nhất"
          subtitle="Những mẫu hoa được đông đảo khách hàng tin chọn tại Nét Việt Florist"
          products={bestSellers}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* SECTION 2: Danh Mục Hoa Bó */}
        <ProductSlider
          title="Bộ Sưu Tập Hoa Bó"
          subtitle="Thiết kế hiện đại, bó hoa tinh tế trao gửi cảm xúc"
          products={hoaBoProducts}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* SECTION 3: Danh Mục Hoa Giỏ / Lẵng */}
        <ProductSlider
          title="Hoa Giỏ & Lẵng Sang Trọng"
          subtitle="Phù hợp tặng sinh nhật, kỷ niệm, sự kiện đối tác"
          products={hoaGioProducts}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* SECTION 4: Lan Hồ Điệp */}
        <ProductSlider
          title="Lan Hồ Điệp Căn Cấp"
          subtitle="Chậu lan quý phái, quà tặng khai trương & đối tác đẳng cấp"
          products={lanHoDiepProducts}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        <HowItWorksSection />
      </main>

      <LeadModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
