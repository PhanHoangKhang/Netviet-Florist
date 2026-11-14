import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Trang */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
            Nét Việt{" "}
            <span className="text-[var(--color-secondary)] font-semibold uppercase tracking-widest">
              Florist
            </span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giúp bạn chọn được mẫu
            hoa ưng ý nhất.
          </p>
        </div>

        {/* Nội dung chính chia 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái (6 cột): Thông tin liên hệ & Form */}
          <div className="lg:col-span-6 space-y-6">
            {/* Thẻ Thông Tin Cửa Hàng */}
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                Thông Tin Shop Hoa
              </h2>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">
                      Địa chỉ:
                    </strong>
                    <span>275 Trần Hưng Đạo, Phan Thiết, Bình Thuận</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">
                      Hotline / Zalo:
                    </strong>
                    <div className="flex gap-3 mt-0.5">
                      <a
                        href="tel:0933660399"
                        className="hover:text-[var(--color-primary)] font-medium"
                      >
                        0933 660 399
                      </a>
                      <span>-</span>
                      <a
                        href="tel:0982310982"
                        className="hover:text-[var(--color-primary)] font-medium"
                      >
                        0982 31 0982
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">
                      Giờ hoạt động:
                    </strong>
                    <span>06:00 - 21:00 (Tất cả các ngày trong tuần)</span>
                  </div>
                </li>
              </ul>

              {/* Nút Chát Nhanh qua Zalo & Facebook */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://zalo.me/2651705435336175205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[var(--color-primary)] text-white font-semibold text-xs hover:opacity-90 transition-opacity shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Zalo Ngay
                </a>

                <a
                  href="https://www.facebook.com/nguoilamhoa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-colors"
                >
                  <img
                    src="/fb.png"
                    alt="Facebook"
                    className="w-4 h-4 object-contain"
                  />
                  Fanpage Facebook
                </a>
              </div>
            </div>

            
          </div>

          {/* Cột phải (6 cột): Bản đồ Google Maps */}
          <div className="lg:col-span-6 h-[400px] lg:h-full min-h-[480px] bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden p-2">
            <iframe
              title="Địa chỉ Nét Việt Florist"
              src="https://maps.google.com/maps?q=N%C3%A9t%20Vi%E1%BB%87t%20Florist%2C%20275%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Phan%20Thi%E1%BA%BFt&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1rem" }}
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
