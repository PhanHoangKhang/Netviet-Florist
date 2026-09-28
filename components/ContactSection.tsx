import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#eadfdc]" style={{
        backgroundImage: "url('/contact-bg.png')",
    }}>
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-50 w-56 rounded-full bg-[var(--color-primary)]/5" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-64 w-64 rounded-full border border-[var(--color-primary)]/10" />

      <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

          {/* LEFT */}
          <div>
            {/* Label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-primary)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Liên hệ Nét Việt
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-[var(--color-text-main)] sm:text-3xl">
              Cần một thiết kế hoa
              <span className="text-[var(--color-primary)]">
                {" "}thật đặc biệt?
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Hãy chia sẻ với Nét Việt dịp bạn đang chuẩn bị. Chúng tôi sẽ
              tư vấn mẫu hoa phù hợp với mong muốn và ngân sách của bạn.
            </p>

            {/* Contact info */}
            <div className="mt-7 grid gap-4 text-sm sm:grid-cols-3">

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-semibold text-[var(--color-text-main)]">
                    Địa chỉ
                  </p>
                  <p className="mt-1 leading-5 text-gray-500">
                    275 Trần Hưng Đạo,
                    <br />
                    Phan Thiết, Bình Thuận
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-semibold text-[var(--color-text-main)]">
                    Hotline / Zalo
                  </p>

                  <div className="mt-1 space-y-1 text-gray-500">
                    <a
                      href="tel:0933660399"
                      className="block transition-colors hover:text-[var(--color-primary)]"
                    >
                      0933 660 399
                    </a>

                    <a
                      href="tel:0982310982"
                      className="block transition-colors hover:text-[var(--color-primary)]"
                    >
                      0982 31 0982
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening hours */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                  <Clock className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-semibold text-[var(--color-text-main)]">
                    Giờ hoạt động
                  </p>

                  <p className="mt-1 leading-5 text-gray-500">
                    06:00 – 21:00
                    <br />
                    Tất cả các ngày
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT - ACTION */}
          <div className="flex flex-col gap-3 lg:min-w-[190px]">

            <a
              href="https://zalo.me/0933660399"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              Chat Zalo ngay
            </a>

            <a
              href="tel:0933660399"
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-primary)]/20 bg-white px-6 py-3 text-sm font-medium text-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            >
              <Phone className="h-4 w-4" />
              Gọi cho chúng tôi
            </a>

            <a
              href="https://www.facebook.com/nguoilamhoa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 text-xs font-medium text-gray-500 transition-colors hover:text-[var(--color-primary)]"
            >
              Xem Fanpage Facebook
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}