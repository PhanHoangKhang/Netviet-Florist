
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  ScrollText,
} from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

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

const systemItems = [
  {
    label: "System Logs",
    href: "/netviet-admin/system-logs",
    icon: ScrollText,
  },
  {
    label: "Cài đặt",
    href: "/netviet-admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Không thể đăng xuất. Vui lòng thử lại.");
      }

      setShowLogoutModal(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi đăng xuất.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isItemActive = (href: string) => {
    if (href === "/netviet-admin") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-gray-100 px-6">
        <Link href="/netviet-admin" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Nét Việt Florist Logo"
            className="h-12 w-12 rounded-full border border-gray-100 object-contain"
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Quản lý
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
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

        {/* System */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Hệ thống
          </p>

          <div className="space-y-1">
            {systemItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
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
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          onClick={() => {
            setLogoutError("");
            setShowLogoutModal(true);
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-red-600"
        >
          <LogOut className="h-[18px] w-[18px]" />
          <span>Đăng xuất</span>
        </button>

        <ConfirmModal
          isOpen={showLogoutModal}
          title="Xác nhận đăng xuất"
          description="Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị Nét Việt Florist không?"
          confirmText="Đăng xuất"
          cancelText="Hủy"
          isLoading={isLoggingOut}
          error={logoutError}
          onConfirm={handleLogout}
          onCancel={() => {
            if (!isLoggingOut) {
              setShowLogoutModal(false);
              setLogoutError("");
            }
          }}
        />
      </div>
    </aside>
  );
}
