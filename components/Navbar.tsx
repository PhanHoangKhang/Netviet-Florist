"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Search } from "lucide-react";
import SearchModal from "@/components/ui/SearchModal";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [searchOpen, setSearchOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 16);
  });

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white">
      {/* 1. TOP BAR - Nền màu Teal thương hiệu (--color-primary) */}
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
          {/* Địa chỉ & Hotline */}
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
          <nav className="hidden flex-1 items-center justify-center gap-6 font-semibold text-sm text-gray-700 md:flex lg:gap-8">
            <Link
              href="/"
              className="whitespace-nowrap py-2 transition-colors hover:text-[var(--color-primary)]"
            >
              Trang Chủ
            </Link>

            <Link
              href="/san-pham"
              className="whitespace-nowrap py-2 transition-colors hover:text-[var(--color-primary)]"
            >
              Sản Phẩm
            </Link>

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
          <div className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm bg-white shadow-xl md:hidden animate-slide-in-right">
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
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-sm font-semibold text-[var(--color-text-main)] transition-colors hover:text-[var(--color-primary)]"
                >
                  Trang Chủ
                  <span className="text-gray-300">→</span>
                </Link>

                <Link
                  href="/san-pham"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-sm font-semibold text-[var(--color-text-main)] transition-colors hover:text-[var(--color-primary)]"
                >
                  Sản Phẩm
                  <span className="text-gray-300">→</span>
                </Link>

                <Link
                  href="/lien-he"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-sm font-semibold text-[var(--color-text-main)] transition-colors hover:text-[var(--color-primary)]"
                >
                  Liên Hệ
                  <span className="text-gray-300">→</span>
                </Link>
              </div>

              {/* Hotline */}
              <div className="mt-8 border-t border-[#eee7e4] pt-6">
                <p className="mb-3 text-xs text-gray-400">
                  Cần tư vấn hoặc đặt hoa?
                </p>

                <a
                  href="tel:0933660399"
                  className="inline-flex w-full items-center justify-center gap-2 bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
                >
                  <Phone className="h-4 w-4" />
                  Gọi 0933 660 399
                </a>
              </div>

              {/* Contact Info */}
              <div className=" border-[#eee7e4] px-5 py-5">
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

              {/* Social */}
              <div className="mt-8 border-t border-[#eee7e4] pt-6">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Kết nối
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/nguoilamhoa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <img
                      src="/fb.png"
                      alt="Facebook"
                      className="h-7 w-7 object-contain"
                    />
                  </a>

                  <a
                    href="https://zalo.me/0933660399"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Zalo"
                  >
                    <img
                      src="/zalo.png"
                      alt="Zalo"
                      className="h-7 w-7 object-contain"
                    />
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
