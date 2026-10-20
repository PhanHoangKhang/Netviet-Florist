
"use client";

import {
  ShoppingBag,
  Wallet,
  Clock3,
  Flower2,
  RefreshCw,
} from "lucide-react";

import StatCard from "@/components/admin/dashboard/StatCard";
import StatGrid from "@/components/admin/dashboard/StatGrid";
import { useDashboardOverview } from "@/hooks/useDashboardOverview";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export default function DashboardStats() {
  const { data, loading, error, refresh } = useDashboardOverview();

  const stats = [
    {
      title: "Đơn hàng hôm nay",
      value: data ? data.ordersToday.toLocaleString("vi-VN") : "—",
      description: "Số đơn được tạo trong hôm nay",
      icon: <ShoppingBag size={21} />,
    },
    {
      title: "Chờ xác nhận",
      value: data ? data.pendingOrders.toLocaleString("vi-VN") : "—",
      description: "Đơn đang chờ xử lý",
      icon: <Clock3 size={21} />,
    },
    {
      title: "Tổng sản phẩm",
      value: data ? data.totalProducts.toLocaleString("vi-VN") : "—",
      description: "Tổng số sản phẩm trong hệ thống",
      icon: <Flower2 size={21} />,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Tổng quan kinh doanh
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Các chỉ số chính của Nét Việt Florist
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          aria-label="Làm mới thống kê"
          className="inline-flex items-center gap-2 border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="font-medium underline underline-offset-4"
          >
            Thử lại
          </button>
        </div>
      )}

      <StatGrid>
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            loading={loading && !data}
          />
        ))}
      </StatGrid>
    </section>
  );
}
