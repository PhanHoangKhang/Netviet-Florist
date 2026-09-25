"use client";

import { Bell, Menu, Search } from "lucide-react";
import NotificationBell from "./NotificationBell";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
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

          {/* Notification */}
          <NotificationBell />

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* Admin profile */}
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
  );
}