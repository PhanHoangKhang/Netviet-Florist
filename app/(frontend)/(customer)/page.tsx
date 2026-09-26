"use client";

import { useEffect, useState } from "react";

import Category from "@/components/Category";
import HeroSlider from "@/components/HeroSlider";
import ValuePropsSection from "@/components/ValuePropsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProductSlider from "@/components/ProductSlider";
import IntroSection from "@/components/IntroSection";
import FAQSection from "@/components/FAQSection";

import type { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/products?limit=50"
        );

        if (!response.ok) {
          throw new Error(
            "Không thể lấy sản phẩm"
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message ||
              "Không thể lấy sản phẩm"
          );
        }

        setProducts(result.data);
      } catch (error) {
        console.error(
          "FETCH HOME PRODUCTS ERROR:",
          error
        );

        setError(
          "Không thể tải sản phẩm"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const bestSellers = products.filter(
    (product) => product.isFeatured
  );

  const hoaBoProducts = products.filter(
    (product) =>
      product.categoryId?.slug === "hoa-bo"
  );

  const hoaGioProducts = products.filter(
    (product) =>
      product.categoryId?.slug === "hoa-gio"
  );

  const lanHoDiepProducts = products.filter(
    (product) =>
      product.categoryId?.slug ===
      "lan-ho-diep"
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* CATEGORY */}
        <Category />

        {/* INTRO - NEW */}
        <IntroSection />

        {/* POSTER */}
        <div
          id="products"
          className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"
        >
          <HeroSlider />

          <ValuePropsSection />
        </div>

        {/* PRODUCTS */}
        {loading && (
          <div className="py-16 text-center text-sm text-gray-500">
            Đang tải sản phẩm...
          </div>
        )}

        {!loading && error && (
          <div className="py-16 text-center text-sm text-gray-500">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <ProductSlider
              title="MẪU HOA BÁN CHẠY NHẤT"
              subtitle="Những mẫu hoa được đông đảo khách hàng tin chọn tại Nét Việt Florist"
              products={bestSellers}
              onSelectProduct={
                setSelectedProduct
              }
            />

            <ProductSlider
              title="BỘ SƯU TẬP HOA BÓ"
              subtitle="Thiết kế hiện đại, bó hoa trao gửi cảm xúc"
              products={hoaBoProducts}
              onSelectProduct={
                setSelectedProduct
              }
            />

            <ProductSlider
              title="HOA GIỎ"
              subtitle="Phù hợp tặng sinh nhật, kỷ niệm, sự kiện đối tác"
              products={hoaGioProducts}
              onSelectProduct={
                setSelectedProduct
              }
            />

            <ProductSlider
              title="LAN HỒ ĐIỆP CAO CẤP"
              subtitle="Chậu lan quý phái, quà tặng khai trương & đối tác đẳng cấp"
              products={lanHoDiepProducts}
              onSelectProduct={
                setSelectedProduct
              }
            />
          </>
        )}

        {/* HOW IT WORKS */}
        <HowItWorksSection />

        {/* FAQ - NEW */}
        <FAQSection />
      </main>
    </div>
  );
}