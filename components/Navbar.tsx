"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

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
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
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

          {/* Social Icons Link */}
          <div className="flex items-center gap-3">
            {/* Facebook Icon link */}
            {/* Icon Facebook */}
            <a
              href="https://www.facebook.com/nguoilamhoa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-110"
              title="Fanpage Facebook"
            >
              <img
                src="/fb.png"
                alt="Facebook Fanpage"
                className="w-7 h-7 object-contain"
              />
            </a>

            {/* Zalo Link */}
            <a
              href="https://zalo.me/0933660399"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-110"
              title="Chat Zalo Tư Vấn"
            >
              <img
                src="/zalo.png"
                alt="Zalo Fanpage"
                className="w-7 h-7 object-contain"
              />
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
          className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Nét Việt Florist Logo"
              className={`object-contain rounded-full border border-gray-100 transition-[width,height] duration-200 ${isScrolled ? "h-10 w-10" : "h-12 w-12"}`}
            />
            <span className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
              Nét Việt{" "}
              <span className="text-[var(--color-secondary)] text-xs font-semibold uppercase tracking-widest block">
                Florist
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-700">
            <Link
              href="/"
              className="hover:text-[var(--color-primary)] transition-colors py-2"
            >
              Trang Chủ
            </Link>
            <Link
              href="/san-pham"
              className="hover:text-[var(--color-primary)] transition-colors py-2"
            >
              Sản Phẩm
            </Link>
            <Link
              href="/lien-he"
              className="hover:text-[var(--color-primary)] transition-colors py-2"
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:0933660399"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-xs hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 shadow-2xs"
            >
              Hotline: 0933 660 399
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[var(--color-primary)] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
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
    </header>
  );
}
