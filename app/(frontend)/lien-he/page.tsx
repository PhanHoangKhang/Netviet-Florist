'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;

    // Chuyển hướng người dùng sang Zalo với nội dung điền sẵn
    const message = `Tôi là ${formData.name || 'Khách hàng'} (${formData.phone}). Yêu cầu tư vấn: ${formData.note || 'Tư vấn đặt hoa'}`;
    const zaloUrl = `https://zalo.me/0933660399?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, '_blank');
  };

  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Trang */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2">
            Nét Việt Florist
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giúp bạn chọn được mẫu hoa ưng ý nhất.
          </p>
        </div>

        {/* Nội dung chính chia 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cột trái (6 cột): Thông tin liên hệ & Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Thẻ Thông Tin Cửa Hàng */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                Thông Tin Shop Hoa
              </h2>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">Địa chỉ:</strong>
                    <span>275 Trần Hưng Đạo, Phan Thiết, Bình Thuận</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">Hotline / Zalo:</strong>
                    <div className="flex gap-3 mt-0.5">
                      <a href="tel:0933660399" className="hover:text-[var(--color-primary)] font-medium">0933 660 399</a>
                      <span>-</span>
                      <a href="tel:0982310982" className="hover:text-[var(--color-primary)] font-medium">0982 31 0982</a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">Giờ hoạt động:</strong>
                    <span>06:00 - 21:00 (Tất cả các ngày trong tuần)</span>
                  </div>
                </li>
              </ul>

              {/* Nút Chát Nhanh qua Zalo & Facebook */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://zalo.me/0933660399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-xs hover:opacity-90 transition-opacity shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Zalo Ngay
                </a>

                <a
                  href="https://www.facebook.com/nguoilamhoa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-colors"
                >
                  <img src="/fb.png" alt="Facebook" className="w-4 h-4 object-contain" />
                  Fanpage Facebook
                </a>
              </div>
            </div>

            {/* Thẻ Form Gửi Yêu Cầu Tư Vấn */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Gửi Yêu Cầu Tư Vấn Mẫu Hoa
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Điền thông tin bên dưới, shop sẽ nhắn tin tư vấn trực tiếp qua Zalo cho bạn.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tên của bạn</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại / Zalo (*)</label>
                  <input
                    type="tel"
                    required
                    placeholder="0933 xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Yêu cầu đặc biệt (Mẫu hoa, Ngân sách, Dịp tặng...)</label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Tư vấn giỏ hoa sinh nhật mẹ khoảng 500k - 700k..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-xs hover:bg-[var(--color-primary)]/90 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Gửi Yêu Cầu Cho Shop
                </button>
              </form>
            </div>

          </div>

          {/* Cột phải (6 cột): Bản đồ Google Maps */}
          <div className="lg:col-span-6 h-[400px] lg:h-full min-h-[480px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2">
            <iframe
              title="Địa chỉ Nét Việt Florist"
              src="https://maps.google.com/maps?q=275%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Phan%20Thi%E1%BA%BFt&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </div>
  );
}