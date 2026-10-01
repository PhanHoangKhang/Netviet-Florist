"use client";

import { useEffect, useRef, useState } from "react";

export default function ValuePropsSection() {
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

  const PROPS = [
    {
      id: 1,
      number: "01",
      title: "Hoa tươi mỗi ngày",
      desc: "Tuyển chọn 100% hoa tươi mới nhập trong ngày.",
      badge: "Tươi mới",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 21a9 9 0 100-18 9 9 0 000 18z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 8v4l3 3"
          />
        </svg>
      ),
    },
    {
      id: 2,
      number: "02",
      title: "Giao nhanh 60–90p",
      desc: "Giao tận tay hỏa tốc, cam kết đúng giờ hẹn.",
      badge: "Đúng hẹn",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      number: "03",
      title: "Duyệt ảnh thực tế",
      desc: "Gửi ảnh thành phẩm qua Zalo trước khi giao.",
      badge: "An tâm",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      number: "04",
      title: "Tặng thiệp & banner",
      desc: "Miễn phí thiết kế và in nội dung chúc mừng.",
      badge: "Miễn phí",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[#eadfdc] bg-[#fffdfb]"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#f3dfd8]/30 blur-3xl" />

      <div className="relative mx-auto max-w-350 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Heading */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[var(--color-primary)]/30" />

            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-primary)]">
              Nét Việt Florist
            </span>

            <span className="h-px w-10 bg-[var(--color-primary)]/30" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text-main)] sm:text-3xl lg:text-[34px]">
            Vì sao nên chọn{" "}
            <span className="text-[var(--color-primary)]">
              Nét Việt Florist?
            </span>
          </h2>
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

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-8">
          {PROPS.map((item, index) => (
            <div
              key={item.id}
              style={{
                transitionDelay: `${250 + index * 120}ms`,
              }}
              className={`group relative flex aspect-auto min-h-[210px] flex-col border border-[#e7dcd8] bg-white px-6 py-7 transition-all duration-700 ease-out sm:min-h-[230px] lg:aspect-square lg:min-h-0 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } hover:-translate-y-1 hover:border-[var(--color-primary)]/35 hover:shadow-[0_12px_30px_rgba(74,33,24,0.06)]`}
            >
              {/* Number */}
              <span className="absolute right-5 top-5 text-[10px] font-medium tracking-[0.2em] text-[var(--color-primary)]/25">
                {item.number}
              </span>

              {/* Icon */}
              <div className="flex justify-center text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                <div className="[&>svg]:h-11 [&>svg]:w-11">{item.icon}</div>
              </div>

              {/* Content */}
              <div className="mt-10 text-center">
                <h3 className="text-[15px] font-semibold text-[var(--color-text-main)]">
                  {item.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[230px] text-sm leading-6 text-gray-500">
                  {item.desc}
                </p>
              </div>

              {/* Bottom info */}
              <div className="mt-auto">
                <div className="flex items-center justify-between border-t border-[#eee7e4] pt-4">
                  <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]/60">
                    {item.badge}
                  </span>

                  <span className="h-px w-7 bg-[var(--color-primary)]/20 transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--color-primary)]/50" />
                </div>
              </div>

              {/* Bottom accent */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--color-primary)] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
