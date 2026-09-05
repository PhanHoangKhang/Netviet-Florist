"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white">
      {/* 1. TOP BAR - Nền màu Teal thương hiệu (--color-primary) */}
      <div className="hidden sm:block bg-[var(--color-primary)] text-white text-xs py-2 px-4">
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
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Nét Việt Florist Logo"
              className="w-12 h-12 object-contain rounded-full border border-gray-100"
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
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-xs hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 shadow-2xs"
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
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-md">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-[var(--color-primary)] border-b border-gray-50"
          >
            Trang Chủ
          </Link>
          <Link
            href="/san-pham"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-[var(--color-primary)] border-b border-gray-50"
          >
            Sản Phẩm
          </Link>
          <Link
            href="/lien-he"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-[var(--color-primary)] border-b border-gray-50"
          >
            Liên Hệ
          </Link>

          <div className="pt-2">
            <a
              href="tel:0933660399"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-bold text-xs shadow-xs"
            >
              Gọi Đặt Hoa: 0933 660 399
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
