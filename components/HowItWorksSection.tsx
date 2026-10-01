"use client";

import { useEffect, useRef, useState } from "react";
import { Flower2, MessageSquare, Camera, Truck } from "lucide-react";

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const STEPS = [
    {
      step: "01",
      title: "Chọn mẫu hoa ưng ý",
      desc: "Bạn chọn mẫu trên web hoặc gửi ảnh mẫu hoa bạn thích qua Zalo cho shop.",
      icon: Flower2,
    },
    {
      step: "02",
      title: "Tư vấn & báo giá",
      desc: "Shop tư vấn loại hoa, màu sắc phù hợp ngân sách và chốt thời gian giao.",
      icon: MessageSquare,
    },
    {
      step: "03",
      title: "Xem ảnh trước khi giao",
      desc: "Thợ làm xong sẽ chụp hình sản phẩm thực tế gửi bạn duyệt trước khi mang đi.",
      icon: Camera,
    },
    {
      step: "04",
      title: "Giao hoa tận tay",
      desc: "Hoa được giao đúng hẹn, đúng người nhận và báo ngay cho bạn khi hoàn tất.",
      icon: Truck,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#eadfdc] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/light-pink-green-natural-backdrop-with-flowers-vector.jpg')",
      }}
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-[#f3dfd8]/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#f1e5df]/25 blur-3xl" />

      <div className="relative mx-auto max-w-350 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[var(--color-primary)]/30" />

            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-primary)]">
              Quy trình đặt hoa
            </span>

            <span className="h-px w-10 bg-[var(--color-primary)]/30" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text-main)] sm:text-3xl lg:text-[34px]">
            Đặt hoa đơn giản,
            <span className="text-[var(--color-primary)]">
              {" "}
              trao trọn yêu thương
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Chỉ với 4 bước đơn giản.
          </p>
        </div>

        {/* Divider */}
        <div
          className={`mx-auto mt-7 flex items-center justify-center transition-all delay-200 duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-px w-8 bg-[#eadfdc]" />
          <span className="mx-3 text-[10px] text-[var(--color-primary)]/50">
            ✦
          </span>
          <span className="h-px w-8 bg-[#eadfdc]" />
        </div>

        {/* Steps */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                style={{
                  transitionDelay: `${250 + index * 120}ms`,
                }}
                className={`group relative flex aspect-auto min-h-[260px] flex-col border border-[#e7dcd8] bg-white px-6 py-7 transition-all duration-700 ease-out sm:min-h-[280px] lg:aspect-square lg:min-h-0 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                } hover:-translate-y-1 hover:border-[var(--color-primary)]/35 hover:shadow-[0_12px_30px_rgba(74,33,24,0.06)]`}
              >
                {/* Step number */}
                <span className="absolute right-5 top-5 text-[10px] font-medium tracking-[0.2em] text-[var(--color-primary)]/25">
                  {item.step}
                </span>

                {/* Large centered icon */}
                <div className="flex justify-center text-[var(--color-primary)] transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-11 w-11" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="mt-6 text-center">
                  <h3 className="text-[15px] font-semibold capitalize text-[var(--color-text-main)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    {item.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[230px] text-sm leading-6 text-gray-500">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom step indicator */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-[var(--color-primary)]/20 transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--color-primary)]/50" />

                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]/55">
                      Bước {item.step}
                    </span>

                    <span className="h-px w-8 bg-[var(--color-primary)]/20 transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--color-primary)]/50" />
                  </div>
                </div>

                {/* Bottom accent */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--color-primary)] transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
