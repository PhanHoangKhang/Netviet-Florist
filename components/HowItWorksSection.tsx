import { Flower2, MessageSquare, Camera, Truck } from "lucide-react";

export default function HowItWorksSection() {
  const STEPS = [
    {
      step: "01",
      title: "Chọn Mẫu Hoa Ứng Ý",
      desc: "Bạn chọn mẫu trên web hoặc gửi ảnh mẫu hoa bạn thích qua Zalo cho shop.",
      icon: Flower2,
    },
    {
      step: "02",
      title: "Tư Vấn & Báo Giá",
      desc: "Shop tư vấn chọn loại hoa, màu sắc phù hợp ngân sách và chốt thời gian giao.",
      icon: MessageSquare,
    },
    {
      step: "03",
      title: "Xem Ảnh Trước Khi Giao",
      desc: "Thợ làm xong sẽ chụp hình sản phẩm thực tế gửi bạn duyệt trước khi mang đi.",
      icon: Camera,
    },
    {
      step: "04",
      title: "Giao Hoa Tận Tay",
      desc: "Hoa được giao đúng hẹn, đúng người nhận và báo ngay cho bạn khi hoàn tất.",
      icon: Truck,
    },
  ];

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quy Trình Đặt Hoa
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            4 bước đơn giản để bạn hoàn toàn an tâm khi gửi tặng hoa tươi
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-[var(--color-primary)] text-white p-6 rounded-2xl border border-teal-600/30 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Card */}
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon nền trắng chữ Teal để nổi bật */}
                    <div className="w-12 h-12 rounded-xl bg-white text-[var(--color-primary)] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    {/* Badge Bước */}
                    <span className="text-xs font-bold text-[var(--color-primary)] bg-white px-3 py-1 rounded-full shadow-xs">
                      Bước {item.step}
                    </span>
                  </div>

                  {/* Content: Tiêu đề trắng & Nội dung xám nhạt/trắng ngà dễ đọc */}
                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-teal-50/90 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Mũi tên chỉ hướng: đổi sang màu nổi bật hơn */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-white bg-[var(--color-primary)] rounded-full p-0.5 border border-white/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}