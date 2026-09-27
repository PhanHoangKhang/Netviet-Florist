import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/animations/TypingText";

export default function IntroSection() {
  return (
    <section className="border-b border-gray-200 bg-[var(--color-bg-light)]">
      <div className="overflow-hidden bg-[#F1E6DC] py-3">
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
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:py-5 lg:grid-cols-2 lg:px-8">
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

              <p className="mt-6 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
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
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-[-100%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,var(--color-primary)_330deg,var(--color-secondary)_345deg,transparent_360deg)] motion-reduce:animate-none" />

              <div className="absolute inset-[2px] z-10 flex items-center justify-center overflow-hidden bg-[var(--color-bg-light)]">
                <img
                  src="/netviet-intro.png"
                  alt="Nét Việt Florist"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
