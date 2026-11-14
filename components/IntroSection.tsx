import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/animations/TypingText";
import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section className="border-b border-gray-200">
      <div className="overflow-hidden bg-[#F1E6DC] py-3 mb-15">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Nét Việt Florist
              </span>

              <span className="text-[var(--color-primary)]/40">·</span>

              <span className="mx-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]/80">
                Hoa tươi mỗi ngày
              </span>

              <span className="text-[var(--color-primary)]/40">·</span>

              <span className="mx-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]/80">
                Thiết kế theo yêu cầu
              </span>

              <span className="text-[var(--color-primary)]/40">·</span>

              <span className="mx-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]/80">
                Gửi gắm cảm xúc
              </span>

              <span className="text-[var(--color-primary)]/40">·</span>

              <span className="mx-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]/80">
                Phan Thiết
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-4 mb-12 grid max-w-[1400px] grid-cols-1 items-center gap-6 px-4 py-8 sm:mt-6 sm:mb-16 sm:gap-8 sm:px-6 sm:py-10 md:py-12 lg:mt-8 lg:mb-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-14">
        {/* LEFT */}
        <div className="order-2 lg:order-1">
          <Reveal direction="left">
            <div className="max-w-2xl">
              <div className="mb-6 flex font-bold items-center gap-2 text-2xl text-[var(--color-primary)]">
                <span>NÉT VIỆT FLORIST</span>
              </div>

              <h1 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text-main)] sm:text-4xl lg:text-5xl">
                <TypingText
                  text="NƠI CẢM XÚC NỞ HOA!"
                  speed={65}
                  deleteSpeed={35}
                  delay={700}
                  pause={2000}
                  className="text-[var(--color-text-main)]"
                />
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-[var(--color-text-main)] sm:text-lg">
                Những thiết kế hoa được chọn lọc và chăm chút cho sinh nhật, kỷ
                niệm, khai trương, cưới hỏi và những dịp đặc biệt trong cuộc
                sống.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/san-pham"
                  className="inline-flex items-center justify-center bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
                >
                  Xem các mẫu hoa
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-[var(--color-text-main)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  Cách đặt hoa
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT */}
        <div className="order-1 lg:order-2">
          <Reveal direction="right" delay={0.15}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="relative mx-auto aspect-square w-[65%] max-w-[180px] overflow-hidden rounded-2xl drop-shadow-[0_12px_35px_rgba(77,13,1,0.18)] sm:w-[75%] sm:max-w-[280px] lg:w-full lg:max-w-[360px]"
            >
              {/* Animated rotating border */}
              <div className="absolute inset-[-100%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,var(--color-primary)_315deg,var(--color-primary-hover)_335deg,transparent_360deg)] motion-reduce:animate-none" />

              {/* Image */}
              <div className="absolute inset-[3px] z-10 overflow-hidden rounded-[13px] bg-[var(--color-bg-light)]">
                <img
                  src="/Olivia_Florist.png"
                  alt="Nét Việt Florist"
                  className="h-full w-full object-cover"
                />

                {/* Light sweep */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[13px]">
                  <div className="absolute -left-[80%] top-[-20%] h-[140%] w-[35%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-md animate-shine motion-reduce:animate-none" />
                </div>
              </div>
            </motion.div>
          </Reveal>

          <p className="mx-auto mt-4 w-[65%] max-w-[180px] text-center text-xs leading-5 text-gray-500 sm:mt-5 sm:w-[75%] sm:max-w-[280px] sm:text-sm sm:leading-6 lg:w-full lg:max-w-[360px]">
            Nét Việt Florist – Shop hoa tươi tại Phan Thiết, Bình Thuận, chuyên
            cung cấp hoa bó, hoa giỏ và hoa thiết kế theo yêu cầu.
          </p>
        </div>
      </div>
    </section>
  );
}
