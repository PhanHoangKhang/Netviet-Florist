"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  Flower2,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Sản phẩm",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Danh mục",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Đơn đặt hoa",
    href: "/admin/orders",
    icon: ClipboardList,
  },
  {
    label: "Khách hàng",
    href: "/admin/customers",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-gray-100 px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
            <Flower2 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide text-[var(--color-primary)]">
              NÉT VIỆT
            </p>

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
              Florist Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Quản lý
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)]"
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
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
            href="/admin/settings"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname.startsWith("/admin/settings")
                ? "bg-[var(--color-primary)] text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)]"
            }`}
          >
            <Settings className="h-[18px] w-[18px]" />
            <span>Cài đặt</span>
          </Link>
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-red-600"
        >
          <LogOut className="h-[18px] w-[18px]" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}