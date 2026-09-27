import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#e8dfdc] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Cột 1: Logo & Giới thiệu */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nét Việt Florist Logo"
                className="h-10 w-10 object-contain"
              />

              <span className="text-xl font-semibold tracking-tight text-[var(--color-primary)]">
                Nét Việt
                <span className="block text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
                  Florist
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Chuyên thiết kế hoa tươi sự kiện, sinh nhật, khai trương theo yêu
              cầu. Trao gửi cảm xúc trọn vẹn.
            </p>
          </div>

          {/* Cột 2: Thông tin liên hệ */}
          <div>
            <h5 className="mb-4 text-sm font-semibold text-[var(--color-text-main)]">
              Liên hệ
            </h5>

            <div className="space-y-2 text-sm leading-6 text-gray-500">
              <p>
                <span className="font-medium text-gray-700">Địa chỉ:</span>{" "}
                275 Trần Hưng Đạo, Phan Thiết, Bình Thuận
              </p>

              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                <a
                  href="mailto:khanhuyen222811@gmail.com"
                  className="transition-colors hover:text-[var(--color-primary)]"
                >
                  khanhuyen222811@gmail.com
                </a>
              </p>

              <p>
                <span className="font-medium text-gray-700">Hotline 1:</span>{" "}
                <a
                  href="tel:0933660399"
                  className="transition-colors hover:text-[var(--color-primary)]"
                >
                  0933 660 399
                </a>
              </p>

              <p>
                <span className="font-medium text-gray-700">Hotline 2:</span>{" "}
                <a
                  href="tel:0982310982"
                  className="transition-colors hover:text-[var(--color-primary)]"
                >
                  0982 31 0982
                </a>
              </p>
            </div>
          </div>

          {/* Cột 3: Hỗ trợ & Bản đồ Google Maps */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              <h5 className="mb-4 text-sm font-semibold text-[var(--color-text-main)]">
                Hỗ trợ & Vị trí
              </h5>

              <div className="mb-4 space-y-1.5 text-sm leading-6 text-gray-500">
                <p>• Tư vấn chọn hoa qua Zalo 24/7</p>
                <p>• Giao hoa tận nơi nhanh chóng</p>
                <p>• Miễn phí thiệp & banner chúc mừng</p>
              </div>
            </div>

            {/* Google Maps - giữ nguyên */}
            <div className="h-32 w-full overflow-hidden border border-[#e8dfdc]">
              <iframe
                title="Địa chỉ Nét Việt Florist"
                src="https://maps.google.com/maps?q=N%C3%A9t%20Vi%E1%BB%87t%20Florist%2C%20275%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Phan%20Thi%E1%BA%BFt&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Cột 4: Kênh kết nối */}
          <div>
            <h5 className="mb-4 text-sm font-semibold text-[var(--color-text-main)]">
              Kết nối với chúng tôi
            </h5>

            <div className="space-y-3">
              {/* Facebook Fanpage - giữ nguyên */}
              <div className="w-full max-w-[340px] overflow-hidden border border-[#e8dfdc] bg-white">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnguoilamhoa%2F&tabs=&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false"
                  width="100%"
                  height="130"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Page Plugin"
                />
              </div>

              {/* Zalo - giữ nguyên chức năng, giảm màu */}
              <a
                href="https://zalo.me/0933660399"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full max-w-[340px] items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
                title="Chat Zalo Tư Vấn"
              >
                <img
                  src="/zalo.png"
                  alt="Zalo Logo"
                  className="h-5 w-5 object-contain"
                />
                <span>Chat Zalo Tư Vấn Trực Tiếp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-10 border-t border-[#eee7e4] pt-5">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-5 text-sm text-gray-400">
              <Link
                href="/chinh-sach-bao-mat"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Chính sách bảo mật
              </Link>

              <span className="h-3 w-px bg-gray-200" />

              <Link
                href="/dieu-khoan-su-dung"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Điều khoản sử dụng
              </Link>
            </div>

            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Nét Việt Florist. All rights reserved.
            </p>
          </div>
        </div>

        {/* Dòng thiết kế */}
        <div className="mt-3 text-center text-sm text-gray-400">
          Thiết kế dành riêng cho Nét Việt Florist
        </div>
      </div>
    </footer>
  );
}