import { Flower2, MessageSquare, Camera, Truck } from "lucide-react";

export default function HowItWorksSection() {
  const STEPS = [
    {
      step: "01",
      title: "CHỌN MẪU HOA ƯNG Ý",
      desc: "Bạn chọn mẫu trên web hoặc gửi ảnh mẫu hoa bạn thích qua Zalo cho shop.",
      icon: Flower2,
      accentColor: "group-hover:border-[var(--color-primary)]",
      badgeBg: "text-[var(--color-primary)]",
    },
    {
      step: "02",
      title: "TƯ VẤN & BÁO GIÁ",
      desc: "Shop tư vấn chọn loại hoa, màu sắc phù hợp ngân sách và chốt thời gian giao.",
      icon: MessageSquare,
      accentColor: "group-hover:border-[var(--color-secondary)]",
      badgeBg: "text-[var(--color-secondary)]",
    },
    {
      step: "03",
      title: "XEM ẢNH TRƯỚC KHI GIAO",
      desc: "Thợ làm xong sẽ chụp hình sản phẩm thực tế gửi bạn duyệt trước khi mang đi.",
      icon: Camera,
      accentColor: "group-hover:border-[var(--color-accent)]",
      badgeBg: "text-yellow-800",
    },
    {
      step: "04",
      title: "GIAO HOA TẬN TAY",
      desc: "Hoa được giao đúng hẹn, đúng người nhận và báo ngay cho bạn khi hoàn tất.",
      icon: Truck,
      accentColor: "group-hover:border-[var(--color-primary)]",
      badgeBg: "text-[var(--color-primary)]",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-[var(--color-bg-light)] to-white border-t border-gray-100 relative overflow-hidden">
      
      {/* Hiệu ứng đốm sáng nền mờ trang trí sinh động */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-5 right-10 w-72 h-72 bg-[var(--color-secondary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quy Trình Đặt Hoa Đơn Giản
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            4 bước dễ dàng để bạn gửi trọn yêu thương đến người nhận
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between overflow-hidden ${item.accentColor}`}
              >
                {/* Con số chìm khổ lớn tạo chiều sâu nghệ thuật ở góc dưới */}
                <span className="absolute -bottom-5 -right-2 text-7xl font-black text-gray-100/70 group-hover:text-[var(--color-primary)]/10 transition-colors select-none pointer-events-none">
                  {item.step}
                </span>

                <div>
                  {/* Top Header Card */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    {/* Icon với hiệu ứng nền gradient bắt mắt khi hover */}
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-light)] text-[var(--color-primary)] border border-teal-100 flex items-center justify-center shadow-xs group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    {/* Badge Bước mang màu riêng */}
                    <span className={`text-xs font-bold px-3 py-1 shadow-2xs ${item.badgeBg}`}>
                      Bước {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </div>

                {/* Mũi tên chỉ hướng giữa các bước (trên màn hình lớn) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white rounded-full border border-gray-200 text-gray-400 items-center justify-center shadow-xs group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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