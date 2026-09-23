"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ProductSlider from "@/components/ProductSlider";
import ProductOrderForm from "@/components/ProductOrderForm";

import {
  ArrowLeft,
  Phone,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";

import type { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Lấy product hiện tại
        const response = await fetch(`/api/products/${slug}`);

        if (!response.ok) {
          throw new Error("Không tìm thấy sản phẩm");
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.message || "Không tìm thấy sản phẩm");
        }

        const currentProduct: Product = result.data;

        setProduct(currentProduct);

        // 2. Lấy sản phẩm cùng category
        const categorySlug = currentProduct.categoryId?.slug;

        if (categorySlug) {
          const relatedResponse = await fetch(
            `/api/products?category=${categorySlug}&limit=20`
          );

          if (relatedResponse.ok) {
            const relatedResult = await relatedResponse.json();

            if (relatedResult.success) {
              const related = relatedResult.data.filter(
                (item: Product) => item._id !== currentProduct._id
              );

              setRelatedProducts(related);
            }
          }
        }
      } catch (error) {
        console.error("FETCH PRODUCT DETAIL ERROR:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Không thể tải sản phẩm"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-light)] py-20 text-center">
        <p className="text-sm text-gray-500">
          Đang tải thông tin sản phẩm...
        </p>
      </div>
    );
  }

  // Error / không tìm thấy
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-light)] py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Không tìm thấy sản phẩm
        </h2>

        <p className="text-xs text-gray-500 mt-2">
          {error ||
            "Mẫu hoa này có thể đã dừng cung cấp hoặc sai đường dẫn."}
        </p>

        <Link
          href="/san-pham"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl shadow-xs hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const productImage =
    product.images?.[0] || "/images/placeholder.jpg";

  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nút quay lại */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[var(--color-primary)] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        {/* Product Detail */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Ảnh */}
          <div className="lg:col-span-5 flex justify-center items-center bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-[380px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Nội dung */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>

              {/* Category */}
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-3">
                {product.categoryId?.name || "Hoa Tươi"}
              </span>

              {/* Name */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-6">
                Liên hệ báo giá
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 border-y border-gray-100 py-4">
                {product.description ||
                  "Sản phẩm được thiết kế tỉ mỉ từ những cành hoa tươi tuyển chọn trong ngày bởi thợ cắm hoa Nét Việt Florist. Phù hợp làm quà tặng sinh nhật, sự kiện và những dịp đặc biệt."}
              </p>

              {/* Cam kết */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-gray-700">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <span>100% Hoa tươi chọn lọc</span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-gray-700">
                  <Truck className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <span>Giao nhanh Phan Thiết</span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-gray-700">
                  <RefreshCw className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <span>Chụp ảnh xem trước</span>
                </div>

              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <a
                href="tel:0933660399"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-xs sm:text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Gọi 0933 660 399
              </a>
            </div>
          </div>
        </div>

        {/* Đặt hoa */}
        <div id="dat-hoa">
          <ProductOrderForm product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <ProductSlider
              title="Mẫu Hoa Cùng Danh Mục"
              subtitle="Những gợi ý hoa tươi tương tự bạn có thể sẽ thích"
              products={relatedProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
}