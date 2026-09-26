"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import type { Product } from "@/types/product";
import { createOrder } from "@/lib/order-api";

interface ProductOrderFormProps {
  product: Product;
}

export default function ProductOrderForm({ product }: ProductOrderFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [occasion, setOccasion] = useState("Sinh nhật");
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await createOrder({
        productId: product._id,
        customerName,
        email,
        phoneNumber,
        deliveryAddress,
        deliveryDate: deliveryDate || undefined,
        occasion,
        quantity: Number(quantity),
        note,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("ORDER ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Không thể gửi yêu cầu đặt hoa."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" />
        <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
          Đặt hoa ngay cho sản phẩm này
        </h2>
      </div>

      {submitted ? (
        <div className="border-t border-gray-200 pt-5">
          <p className="font-medium text-green-600">
            Yêu cầu đặt hoa đã được gửi.
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            Nét Việt Florist sẽ liên hệ với bạn qua số{" "}
            <span className="font-medium text-gray-700">
              {phoneNumber}
            </span>{" "}
            để xác nhận mẫu hoa và thời gian giao hàng.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Họ và tên đầy đủ
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
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Số điện thoại
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

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Địa chỉ giao hàng
              </label>
              <input
                type="text"
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Phan Thiết, Bình Thuận"
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

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Đang gửi yêu cầu..."
              : "Gửi yêu cầu đặt hoa"}
          </button>
        </form>
      )}
    </div>
  );
}
