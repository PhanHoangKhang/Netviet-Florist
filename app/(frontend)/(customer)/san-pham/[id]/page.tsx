"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ProductSlider from "@/components/ProductSlider";
import ProductOrderForm from "@/components/ProductOrderForm";

import { ArrowLeft, Phone, ShieldCheck, Truck, RefreshCw } from "lucide-react";

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
            `/api/products?category=${categorySlug}&limit=20`,
          );

          if (relatedResponse.ok) {
            const relatedResult = await relatedResponse.json();

            if (relatedResult.success) {
              const related = relatedResult.data.filter(
                (item: Product) => item._id !== currentProduct._id,
              );

              setRelatedProducts(related);
            }
          }
        }
      } catch (error) {
        console.error("FETCH PRODUCT DETAIL ERROR:", error);

        setError(
          error instanceof Error ? error.message : "Không thể tải sản phẩm",
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
        <p className="text-sm text-gray-500">Đang tải thông tin sản phẩm...</p>
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
          {error || "Mẫu hoa này có thể đã dừng cung cấp hoặc sai đường dẫn."}
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

  const productImage = product.images?.[0] || "/images/placeholder.jpg";

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
        <div className="mb-16 grid grid-cols-1 gap-8 border border-[#e8dfdc] bg-white p-5 sm:p-7 lg:grid-cols-12 lg:p-8">
          {/* Ảnh */}
          <div className="group lg:col-span-5 overflow-hidden bg-[var(--color-bg-light)]">
            <img
              src={productImage}
              alt={product.name}
              className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[480px]"
            />
          </div>

          {/* Nội dung */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Category */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-[var(--color-primary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {product.categoryId?.name || "Hoa Tươi"}
                </span>
              </div>

              {/* Name */}
              <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[var(--color-text-main)] sm:text-4xl">
                {product.name}
              </h1>

              {/* Price */}
              <p className="mt-5 text-lg font-semibold text-[var(--color-primary)]">
                Liên hệ báo giá
              </p>

              {/* Description */}
              <div className="my-7 border-y border-[#eee7e4] py-5">
                <p className="max-w-2xl text-sm leading-7 text-gray-500">
                  {product.description ||
                    "Sản phẩm được thiết kế tỉ mỉ từ những cành hoa tươi tuyển chọn trong ngày bởi thợ cắm hoa Nét Việt Florist. Phù hợp làm quà tặng sinh nhật, sự kiện và những dịp đặc biệt."}
                </p>
              </div>

              {/* Cam kết */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3 border-l border-[var(--color-primary)]/30 pl-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <span className="text-xs leading-5 text-gray-600">
                    Hoa tươi chọn lọc
                  </span>
                </div>

                <div className="flex items-start gap-3 border-l border-[var(--color-primary)]/30 pl-3">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <span className="text-xs leading-5 text-gray-600">
                    Giao nhanh Phan Thiết
                  </span>
                </div>

                <div className="flex items-start gap-3 border-l border-[var(--color-primary)]/30 pl-3">
                  <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <span className="text-xs leading-5 text-gray-600">
                    Chụp ảnh xem trước
                  </span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 border-t border-[#eee7e4] pt-6">
              <a
                href="tel:0933660399"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--color-primary-hover)]"
              >
                <Phone className="h-4 w-4" />
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
