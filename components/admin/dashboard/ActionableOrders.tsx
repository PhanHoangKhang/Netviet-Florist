
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Package,
  Phone,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

import {
  useActionableOrders,
  type ActionableOrder,
} from "@/hooks/useActionableOrders";

function formatDate(value: string | null) {
  if (!value) return "Chưa lên lịch";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}

function StatusBadge({
  status,
}: {
  status: ActionableOrder["status"];
}) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-neutral-500">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "pending" ? "bg-[#4d0d01]" : "bg-neutral-300"
        }`}
      />
      {status === "pending" ? "Chờ xác nhận" : "Đã xác nhận"}
    </span>
  );
}

function OrderRow({ order }: { order: ActionableOrder }) {
  return (
    <div className="group flex flex-col gap-4 border-b border-neutral-100 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <ShoppingBag
          size={19}
          strokeWidth={1.5}
          className="mt-0.5 shrink-0 text-[#4d0d01]"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="font-medium text-neutral-900">
              #{order.id.slice(-6).toUpperCase()}
            </p>
            <StatusBadge status={order.status} />
          </div>

          <p className="mt-1.5 truncate text-sm text-neutral-700">
            {order.customerName}
            <span className="mx-2 text-neutral-300">/</span>
            <span className="text-neutral-500">{order.occasion}</span>
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <Package size={13} strokeWidth={1.5} />
              {order.quantity} sản phẩm
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} strokeWidth={1.5} />
              Giao: {formatDate(order.deliveryDate)}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} strokeWidth={1.5} />
              Đặt: {formatDateTime(order.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 pl-8 sm:pl-0">
        <a
          href={`tel:${order.phoneNumber}`}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-[#4d0d01]"
        >
          <Phone size={14} strokeWidth={1.5} />
          Gọi khách
        </a>

        <Link
          href={`/netviet-admin/orders/${order.id}`}
          aria-label={`Xem chi tiết đơn ${order.id.slice(-6)}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4d0d01] transition-opacity hover:opacity-70"
        >
          Chi tiết
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}

export default function ActionableOrders() {
  const { orders, loading, error, refresh } = useActionableOrders();

  const pendingCount = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const confirmedCount = orders.filter(
    (order) => order.status === "confirmed",
  ).length;

  return (
    <section className="border border-neutral-200 bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
              Đơn hàng cần xử lý
            </h2>
          </div>

          <p className="mt-2 text-sm text-neutral-500">
            Theo dõi các đơn hàng đang chờ xác nhận và chuẩn bị giao.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-[#4d0d01] disabled:opacity-40"
        >
          <RefreshCw
            size={14}
            strokeWidth={1.5}
            className={loading ? "animate-spin" : ""}
          />
          Làm mới
        </button>
      </div>

      {/* Summary */}
      {!loading && !error && (
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-neutral-100 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums text-neutral-900">
              {pendingCount}
            </span>
            <span className="text-sm text-neutral-500">
              Chờ xác nhận
            </span>
          </div>

          <span className="hidden h-7 w-px bg-neutral-200 sm:block" />

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums text-neutral-900">
              {confirmedCount}
            </span>
            <span className="text-sm text-neutral-500">
              Đã xác nhận
            </span>
          </div>

          <span className="ml-auto text-xs text-neutral-400">
            Tối đa 6 đơn
          </span>
        </div>
      )}

      {/* Orders */}
      <div className="mt-2">
        {loading ? (
          <div className="space-y-5 py-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="space-y-3 border-b border-neutral-100 pb-5 last:border-0"
              >
                <div className="h-4 w-36 animate-pulse bg-neutral-100" />
                <div className="h-3 w-52 animate-pulse bg-neutral-100" />
                <div className="h-3 w-64 max-w-full animate-pulse bg-neutral-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="py-8 text-sm text-neutral-600"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => void refresh()}
              className="mt-3 font-medium text-[#4d0d01] hover:underline"
            >
              Thử tải lại
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <ShoppingBag
              size={25}
              strokeWidth={1.25}
              className="text-neutral-400"
            />
            <p className="mt-4 text-sm font-medium text-neutral-800">
              Không có đơn hàng cần xử lý
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Các đơn mới sẽ xuất hiện tại đây.
            </p>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 border-t border-neutral-200 pt-4">
        <Link
          href="/netviet-admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4d0d01] transition-colors hover:gap-3"
        >
          Xem tất cả đơn hàng
          <ArrowRight size={15} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
