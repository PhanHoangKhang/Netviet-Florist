"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Nét Việt có nhận đặt hoa theo yêu cầu không?",
    answer:
      "Có. Bạn có thể chọn mẫu hoa có sẵn hoặc gửi yêu cầu riêng về màu sắc, kiểu dáng và dịp tặng. Nét Việt sẽ liên hệ để tư vấn và xác nhận chi tiết.",
  },
  {
    question: "Tôi có thể đặt hoa trước bao lâu?",
    answer:
      "Bạn nên đặt trước ít nhất 1 ngày để Nét Việt có thời gian chuẩn bị hoa và đảm bảo mẫu hoa được thực hiện tốt nhất.",
  },
  {
    question: "Nét Việt có giao hoa tận nơi không?",
    answer:
      "Có. Nét Việt hỗ trợ giao hoa tận nơi trong khu vực phục vụ. Thời gian và phí giao hàng sẽ được xác nhận khi tư vấn đơn.",
  },
  {
    question: "Giá sản phẩm trên website có cố định không?",
    answer:
      "Giá có thể thay đổi tùy theo loại hoa, mùa hoa, kích thước và yêu cầu thiết kế. Giá cuối cùng sẽ được xác nhận trước khi đơn hàng được thực hiện.",
  },
  {
    question: "Tôi có thể yêu cầu thay đổi màu hoa không?",
    answer:
      "Có. Bạn có thể ghi rõ mong muốn trong phần ghi chú khi đặt hoa. Nét Việt sẽ tư vấn những lựa chọn phù hợp với mẫu hoa.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className="border-t border-gray-200 bg-[var(--color-bg-light)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
              FAQ
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-main)] sm:text-3xl">
              Những câu hỏi
              <br />
              thường gặp
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Một vài thông tin giúp bạn dễ dàng
              hơn trong quá trình lựa chọn và đặt
              hoa tại Nét Việt.
            </p>
          </div>

          {/* FAQ list */}
          <div className="border-t border-gray-200">
            {faqs.map((faq, index) => {
              const isOpen =
                openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-gray-200"
                >
                  <button
                    type="button"
                    onClick={() =>
                      toggleFAQ(index)
                    }
                    className="group flex w-full items-start gap-4 py-5 text-left"
                  >
                    {/* Number */}

                    <span className="pt-0.5 font-mono text-[11px] text-gray-400 transition-colors group-hover:text-[var(--color-primary)]">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* Question */}

                    <span
                      className={`flex-1 text-sm font-medium transition-colors sm:text-base ${
                        isOpen
                          ? "text-[var(--color-primary)]"
                          : "text-gray-800 group-hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Icon */}

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-200 ${
                        isOpen
                          ? "rotate-45"
                          : ""
                      }`}
                    >
                      <Plus
                        className="h-4 w-4 text-gray-400"
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>

                  {/* Answer */}

                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-8 pr-8 text-sm leading-7 text-gray-500 sm:pl-9 sm:pr-12">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}