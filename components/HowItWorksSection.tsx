import { Flower2, MessageSquare, Camera, Rocket } from "lucide-react";

export default function HowItWorksSection() {
  const STEPS = [
    {
      step: "01",
      title: "Chọn Mẫu Hoa",
      desc: "Tham khảo mẫu sẵn trên website hoặc gửi hình mẫu riêng bạn thích.",
      icon: Flower2,
    },
    {
      step: "02",
      title: "Chốt Đơn & Báo Giá",
      desc: "Tư vấn chi tiết loại hoa, màu sắc và báo giá ưu đãi qua Zalo/Hotline.",
      icon: MessageSquare,
    },
    {
      step: "03",
      title: "Thiết Kế & Duyệt Ảnh",
      desc: "Florist cắm hoa tỉ mỉ và gửi ảnh thực tế cho bạn kiểm tra trước.",
      icon: Camera,
    },
    {
      step: "04",
      title: "Giao Hoa Tận Nơi",
      desc: "Giao hoa an toàn, đúng giờ hẹn và gửi thông báo hoàn tất đơn hàng.",
      icon: Rocket,
    },
  ];

  return (
    <section className="border-t border-gray-100 bg-(--color-bg-light) py-12">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-9">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Quy Trình Đặt Hoa
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            4 bước đơn giản để nhận được bó hoa ưng ý
          </p>
        </div>

        {/* Steps Grid với đường nối Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white p-5 rounded-xl border border-gray-100 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-(--color-primary) text-white flex items-center justify-center">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    Bước {item.step}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
