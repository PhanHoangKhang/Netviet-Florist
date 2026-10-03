"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  Search,
  X,
  LayoutDashboard,
  Package,
  FolderTree,
  ClipboardList,
  Users,
  Settings,
} from "lucide-react";
import NotificationBell from "./NotificationBell";

const menuItems = [
  {
    label: "Dashboard",
    href: "/netviet-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Sản phẩm",
    href: "/netviet-admin/products",
    icon: Package,
  },
  {
    label: "Danh mục",
    href: "/netviet-admin/categories",
    icon: FolderTree,
  },
  {
    label: "Đơn đặt hoa",
    href: "/netviet-admin/orders",
    icon: ClipboardList,
  },
  {
    label: "Khách hàng",
    href: "/netviet-admin/customers",
    icon: Users,
  },
];

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(true);
    onMenuClick?.();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-5">
          <Link
            href="/netviet-admin"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="Nét Việt Florist Logo"
              className="h-11 w-11 rounded-full border border-gray-100 object-contain"
            />

            <div>
              <p className="text-sm font-bold tracking-wide text-[var(--color-primary)]">
                NÉT VIỆT
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                Florist Admin
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Quản lý
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[var(--color-primary)]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Settings */}
          <div className="mt-8">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Hệ thống
            </p>

            <Link
              href="/netviet-admin/settings"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[var(--color-primary)]"
            >
              <Settings className="h-[18px] w-[18px]" />
              <span>Cài đặt</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Topbar */}
      <header className="sticky top-0 z-30 h-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={handleMenuClick}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="h-10 w-64 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-700 outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-1 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <NotificationBell />

            <div className="hidden h-8 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Admin
                </p>

                <p className="text-[11px] text-gray-400">
                  Quản trị viên
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                A
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}