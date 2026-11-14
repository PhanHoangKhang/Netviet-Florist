"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import SearchModal from "@/components/ui/SearchModal";

// Các nhóm danh mục trên Navbar
const productGroups = [
  {
    label: "Chủ Đề",
    slug: "topic",
    children: [
      { label: "Hoa sinh nhật", slug: "hoa-sinh-nhat" },
      { label: "Hoa khai trương", slug: "hoa-khai-truong" },
      { label: "Hoa chúc mừng", slug: "hoa-chuc-mung" },
      { label: "Hoa chia buồn", slug: "hoa-chia-buon" },
    ],
  },
  {
    label: "Đối Tượng",
    slug: "audience",
    children: [
      { label: "Hoa tặng người yêu", slug: "hoa-tang-nguoi-yeu" },
      { label: "Hoa tặng mẹ", slug: "hoa-tang-me" },
      { label: "Hoa tặng bạn bè", slug: "hoa-tang-ban-be" },
    ],
  },
  {
    label: "Kiểu Dáng",
    slug: "style",
    children: [
      { label: "Hoa bó", slug: "hoa-bo" },
      { label: "Hoa giỏ", slug: "hoa-gio" },
      { label: "Hoa hộp", slug: "hoa-hop" },
    ],
  },
  {
    label: "Hoa Tươi",
    slug: "flower",
    children: [
      { label: "Hoa hồng", slug: "hoa-hong" },
      { label: "Hoa hướng dương", slug: "hoa-huong-duong" },
      { label: "Hoa đồng tiền", slug: "hoa-dong-tien" },
      { label: "Lan hồ điệp", slug: "lan-ho-diep" },
    ],
  },
  {
    label: "Màu Sắc",
    slug: "color",
    children: [
      { label: "Hoa đỏ", slug: "hoa-do" },
      { label: "Hoa trắng", slug: "hoa-trang" },
      { label: "Hoa màu hồng", slug: "hoa-mau-hong" },
    ],
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState<string | null>(
    null,
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 16);
  });

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white">
      {/* 1. TOP BAR */}
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : "auto",
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="hidden overflow-hidden bg-[var(--color-primary)] px-4 py-2 text-xs text-white sm:block"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 my-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              275 Trần Hưng Đạo, Phan Thiết, Bình Thuận
            </span>

            <span className="hidden md:inline text-white/40">|</span>

            <a
              href="tel:0933660399"
              className="flex items-center gap-1.5 hover:text-teal-100 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              0933 660 399 - 0982 31 0982
            </a>
          </div>
        </div>
      </motion.div>

      {/* 2. MAIN NAVBAR */}
      <div className="border-b border-gray-100 bg-white">
        <motion.div
          initial={false}
          animate={{ height: isScrolled ? 64 : 80 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-3 sm:px-6 lg:px-8"
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          >
            <img
              src="/logo.png"
              alt="Nét Việt Florist Logo"
              className={`shrink-0 rounded-full border border-gray-100 object-contain transition-all duration-200 ${
                isScrolled
                  ? "h-9 w-9 sm:h-10 sm:w-10"
                  : "h-10 w-10 sm:h-12 sm:w-12"
              }`}
            />

            <span className="text-xl font-bold tracking-tight text-[var(--color-primary)] sm:text-2xl">
              Nét Việt
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--color-secondary)] sm:text-xs">
                Florist
              </span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden flex-1 items-center justify-center gap-4 font-semibold text-xs text-gray-700 md:flex lg:gap-6 lg:text-sm">
            <Link
              href="/"
              className="whitespace-nowrap py-2 transition-colors hover:text-[var(--color-primary)]"
            >
              Trang Chủ
            </Link>

            {productGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown((prev) =>
                      prev === group.label ? null : group.label,
                    )
                  }
                  className="flex items-center gap-1 whitespace-nowrap py-2 transition-colors hover:text-[var(--color-primary)]"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === group.label}
                >
                  {group.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === group.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                {activeDropdown === group.label && (
                  <div className="absolute left-1/2 top-full z-50 min-w-[220px] -translate-x-1/2 border border-gray-100 bg-white py-2 shadow-xl">
                    {group.children.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/san-pham?category=${item.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-5 py-2.5 text-sm font-normal text-black transition-colors hover:bg-gray-50 hover:pl-6 hover:text-[var(--color-primary)]"
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="mt-2 border-t border-gray-100 pt-2">
                      <Link
                        href={`/san-pham?group=${group.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-5 py-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                      >
                        Xem thêm →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/lien-he"
              className="whitespace-nowrap py-2 transition-colors hover:text-[var(--color-primary)]"
            >
              Liên Hệ
            </Link>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* SEARCH BUTTON */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm sản phẩm"
              className="hidden h-14 w-14 shrink-0 items-center justify-center text-[var(--color-primary)] transition-opacity hover:opacity-60 md:flex"
            >
              <Search size={27} strokeWidth={1.8} />
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-700 transition-colors hover:text-[var(--color-primary)] focus:outline-none md:hidden"
              aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3. MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Side Menu */}
          <div className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm overflow-y-auto bg-white shadow-xl md:hidden animate-slide-in-right">
            {/* Header */}
            <div className="flex h-20 text-right items-center justify-end border-b border-[#eee7e4] px-5">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 transition-colors hover:text-[var(--color-primary)]"
                aria-label="Đóng menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-5 py-6">
              {/* SEARCH */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="mb-5 flex w-full items-center gap-3 border-b border-[#eee7e4] pb-4 text-sm text-gray-500 transition-colors hover:text-[var(--color-primary)]"
              >
                <Search size={19} strokeWidth={1.6} />
                <span>Tìm kiếm sản phẩm hoa</span>
              </button>

              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Menu
              </p>

              <div className="divide-y divide-[#eee7e4]">
                {/* HOME */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-sm font-semibold text-[var(--color-text-main)] transition-colors hover:text-[var(--color-primary)]"
                >
                  Trang Chủ
                  <span className="text-gray-300">→</span>
                </Link>

                {/* PRODUCT GROUPS */}
                {productGroups.map((group) => {
                  const isOpen = mobileProductOpen === group.label;

                  const closeMobileMenu = () => {
                    setMobileProductOpen(null);
                    setIsMobileMenuOpen(false);
                  };

                  return (
                    <div key={group.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileProductOpen(isOpen ? null : group.label)
                        }
                        className="flex w-full items-center justify-between py-4 text-sm font-semibold text-[var(--color-text-main)] transition-colors hover:text-[var(--color-primary)]"
                        aria-expanded={isOpen}
                      >
                        {group.label}

                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="space-y-1 pb-4 pl-3">
                          {group.children.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/san-pham?category=${item.slug}`}
                              onClick={closeMobileMenu}
                              className="block py-2 text-sm font-normal text-black transition-colors hover:text-[var(--color-primary)]"
                            >
                              {item.label}
                            </Link>
                          ))}

                          <Link
                            href={`/san-pham?group=${group.slug}`}
                            onClick={closeMobileMenu}
                            className="mt-2 block border-t border-[#eee7e4] pt-3 text-sm font-semibold text-[var(--color-primary)]"
                          >
                            Xem thêm →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* CONTACT */}
                <Link
                  href="/lien-he"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-sm font-semibold text-[var(--color-text-main)] transition-colors hover:text-[var(--color-primary)]"
                >
                  Liên Hệ
                  <span className="text-gray-300">→</span>
                </Link>
              </div>

              {/* Contact */}
              <div className="mt-8 space-y-4 border-t border-[#eee7e4] pt-6">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Cần tư vấn hoặc đặt hoa?
                  </p>
                  <p className="text-xs text-gray-400">
                    Liên hệ với chúng tôi để được hỗ trợ nhanh chóng.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Hotline */}
                  <a
                    href="tel:0933660399"
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>Gọi 0933 660 399</span>
                  </a>

                  {/* Zalo */}
                  <a
                    href="https://zalo.me/2651705435336175205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#0068FF] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0054CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068FF]"
                  >
                    <img
                      src="/zalo.png"
                      alt=""
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 object-contain"
                    />
                    <span>Liên hệ qua Zalo</span>
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-[#eee7e4] px-5 py-5">
                <div className="space-y-3 text-xs text-gray-500">
                  {/* Địa chỉ */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />

                    <span className="leading-5">
                      275 Trần Hưng Đạo,
                      <br />
                      Phan Thiết, Bình Thuận
                    </span>
                  </div>

                  {/* Hotline */}
                  <a
                    href="tel:0933660399"
                    className="flex items-center gap-3 transition-colors hover:text-[var(--color-primary)]"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />

                    <span className="leading-5">
                      0933 660 399 - 0982 31 0982
                    </span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
