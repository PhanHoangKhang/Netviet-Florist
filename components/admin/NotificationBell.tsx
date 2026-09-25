"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  ClipboardList,
  MessageCircle,
  Package,
  X,
} from "lucide-react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "order" | "consultation" | "product" | "system";
  isRead: boolean;
  createdAt: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "/api/admin/notifications?limit=10",
      );

      const result = await response.json();

      if (result.success) {
        setNotifications(result.data);
        setUnreadCount(result.unreadCount);
      }
    } catch (error) {
      console.error("FETCH NOTIFICATIONS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Kiểm tra notification mới mỗi 30 giây
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}`, {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("MARK NOTIFICATION ERROR:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/admin/notifications/read-all", {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("MARK ALL ERROR:", error);
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <ClipboardList className="h-4 w-4" />;

      case "consultation":
        return <MessageCircle className="h-4 w-4" />;

      case "product":
        return <Package className="h-4 w-4" />;

      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTime = (date: string) => {
    const createdAt = new Date(date);
    const now = new Date();

    const diff =
      Math.floor(
        (now.getTime() - createdAt.getTime()) / 1000,
      );

    if (diff < 60) {
      return "Vừa xong";
    }

    if (diff < 3600) {
      return `${Math.floor(diff / 60)} phút trước`;
    }

    if (diff < 86400) {
      return `${Math.floor(diff / 3600)} giờ trước`;
    }

    return createdAt.toLocaleDateString("vi-VN");
  };

  return (
    <div className="relative">
      {/* Bell */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-[var(--color-primary)]"
        aria-label="Thông báo"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-secondary)] px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Mobile overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/10 lg:hidden"
            onClick={() => setOpen(false)}
          />

          <div className="fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Thông báo
                </h3>

                {unreadCount > 0 && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    {unreadCount} thông báo chưa đọc
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--color-primary)] hover:bg-gray-50"
                  >
                    Đọc tất cả
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-[420px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-50">
                    <Bell className="h-5 w-5 text-gray-400" />
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    Chưa có thông báo
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Các hoạt động mới sẽ xuất hiện ở đây.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <button
                    key={notification._id}
                    type="button"
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification._id);
                      }
                    }}
                    className={`flex w-full gap-3 border-b border-gray-50 px-5 py-4 text-left transition hover:bg-gray-50 ${
                      !notification.isRead
                        ? "bg-[var(--color-primary)]/[0.03]"
                        : "bg-white"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        notification.type === "order"
                          ? "bg-blue-50 text-blue-600"
                          : notification.type === "consultation"
                            ? "bg-purple-50 text-purple-600"
                            : notification.type === "product"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm ${
                            notification.isRead
                              ? "font-medium text-gray-700"
                              : "font-semibold text-gray-900"
                          }`}
                        >
                          {notification.title}
                        </p>

                        {!notification.isRead && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-secondary)]" />
                        )}
                      </div>

                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-[11px] text-gray-400">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}