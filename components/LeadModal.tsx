'use client';

import { useState } from 'react';

type Product = { id: string; name: string };

interface LeadModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function LeadModal({ product, onClose }: LeadModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi dữ liệu tới API/Webhook tại đây
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h3 className="text-xl font-bold text-gray-800">Đặt hàng & Báo giá</h3>
            <p className="text-sm text-gray-500 mt-1">
              Sản phẩm: <span className="font-semibold text-[var(--color-primary)]">{product.name}</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại / Zalo</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901234567"
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--color-secondary)] text-white font-bold hover:opacity-90 transition"
              >
                Gửi yêu cầu
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <h3 className="text-2xl font-bold text-[var(--color-primary)]">Cảm ơn bạn!</h3>
            <p className="text-sm text-gray-600 mt-2">
              Nét Việt Florist sẽ liên hệ qua Zalo/SĐT <span className="font-semibold">{phone}</span> trong giây lát.
            </p>
            <a
              href={`https://zalo.me/0933660399`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-hover)] transition"
            >
              Chat Zalo ngay với shop
            </a>
          </div>
        )}
      </div>
    </div>
  );
}