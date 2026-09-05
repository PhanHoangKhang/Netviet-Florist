"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MOCK_PRODUCTS, type Product } from "@/mock/data";
import ProductSlider from "@/components/ProductSlider";
import ProductOrderForm from "@/components/ProductOrderForm";
import { ArrowLeft, Phone, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  // Tìm sản phẩm hiện tại theo ID
  const product = MOCK_PRODUCTS.find((p: Product) => p.id === productId);

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-light)] py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-xs text-gray-500 mt-2">
          Mẫu hoa này có thể đã dừng cung cấp hoặc sai đường dẫn.
        </p>
        <Link
          href="/san-pham"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl shadow-xs hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  // Lọc danh sách sản phẩm liên quan (Cùng categoryId, trừ sản phẩm hiện tại)
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p: Product) => p.categoryId === product.categoryId && p.id !== product.id,
  );

  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nút Quay lại */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[var(--color-primary)] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        {/* Khối Thông Tin Chi Tiết Sản Phẩm */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Ảnh Sản Phẩm (Bên trái - 5 cột) */}
          <div className="lg:col-span-5 flex justify-center items-center bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[380px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Nội Dung Sản Phẩm (Bên phải - 7 cột) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-3">
                {product.category || "Hoa Tươi"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                {product.name}
              </h1>

              <div className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-6">
                Liên hệ báo giá
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 border-y border-gray-100 py-4">
                Sản phẩm được thiết kế tỉ mỉ từ những cành hoa tươi tuyển chọn
                trong ngày bởi thợ cắm hoa Nét Việt Florist. Phù hợp làm quà
                tặng sinh nhật, sự kiện, chúc mừng sang trọng.
              </p>

              {/* Khối Cam Kết Dịch Vụ */}
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

            {/* Các Nút Hành Động Dat Hoa */}
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

        <ProductOrderForm product={product} />

        {/* Section Sản Phẩm Liên Quan (Cùng Category, trượt ngang mượt mà) */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <ProductSlider
              title="Mẫu Hoa Cùng Danh Mục"
              subtitle="Những gợi ý hoa tươi tương tự bạn có thể sẽ thích"
              products={relatedProducts}
              onSelectProduct={(p: Product) => router.push(`/san-pham/${p.id}`)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
