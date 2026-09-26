import Link from "next/link";
import Reveal from "@/components/animations/Reveal";

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
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
        {/* LEFT */}
        <Reveal direction="left">
          <div className="max-w-2xl">
            <div className="mb-6 flex font-bold items-center gap-2 text-2xl text-[var(--color-primary)]">
              <span>NÉT VIỆT FLORIST</span>
            </div>

            <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--color-text-main)] sm:text-5xl lg:text-6xl">
              Những đóa hoa
              <br />
              thay bạn
              <span className="text-[var(--color-primary)]">
                {" "}
                nói điều muốn nói.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
              Những thiết kế hoa được chọn lọc và chăm chút cho sinh nhật, kỷ
              niệm, khai trương, cưới hỏi và những dịp đặc biệt trong cuộc sống.
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

        {/* RIGHT */}
        <Reveal direction="right" delay={0.15}>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-[#eee9e4]">
              <img
                src="/netviet-intro.png"
                alt="Hoa tươi tại Nét Việt Florist"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
