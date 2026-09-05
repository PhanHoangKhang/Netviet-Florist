"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MOCK_PRODUCTS, type Product } from "@/mock/data";
import ProductSlider from "@/components/ProductSlider";
import {
  ArrowLeft,
  Phone,
  ShieldCheck,
  Truck,
  RefreshCw,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [submitted, setSubmitted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [occasion, setOccasion] = useState("Sinh nhật");
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");

  // Tìm sản phẩm hiện tại theo ID
  const product = MOCK_PRODUCTS.find((p: Product) => p.id === productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

            {/* Form đặt hoa trực tiếp trên trang chi tiết */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
                  Đặt hoa ngay cho sản phẩm này
                </h2>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">
                        Yêu cầu của bạn đã được gửi thành công.
                      </p>
                      <p className="mt-1 text-emerald-600">
                        Nét Việt Florist sẽ liên hệ lại qua số{" "}
                        <strong>{phoneNumber}</strong> để xác nhận mẫu hoa và
                        thời gian giao hàng.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Số điện thoại / Zalo
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0901 234 567"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Ngày giao
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Số lượng
                      </label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      >
                        <option value="1">1 bó / 1 giỏ</option>
                        <option value="2">2 bó / 2 giỏ</option>
                        <option value="3">3 bó / 3 giỏ</option>
                        <option value="4">4 bó / 4 giỏ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Dịp tặng
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      >
                        <option value="Sinh nhật">Sinh nhật</option>
                        <option value="Kỷ niệm">Kỷ niệm</option>
                        <option value="Chúc mừng">Chúc mừng</option>
                        <option value="Cưới hỏi">Cưới hỏi</option>
                        <option value="Thương nhớ">Thương nhớ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Địa chỉ giao
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Phan Thiết, Bình Thuận"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Ghi chú / Yêu cầu thêm
                    </label>
                    <textarea
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ví dụ: Màu hoa hồng đỏ, thêm thiệp chúc mừng, giao sớm 8h sáng..."
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    />
                  </div>

                  <div className="rounded-xl bg-white border border-dashed border-gray-200 p-3 text-xs text-gray-600">
                    <p className="font-semibold text-gray-800 mb-1">
                      Sản phẩm đang đặt:
                    </p>
                    <p>{product.name}</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Gửi yêu cầu đặt hoa
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

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
