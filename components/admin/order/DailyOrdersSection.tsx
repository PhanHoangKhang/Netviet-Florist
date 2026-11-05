"use client";

import { useMemo } from "react";
import { Order, OrderStatus } from "@/types/order";
import OrderTable from "@/components/admin/order/OrderTable";
import OrderSection from "./OrderSection";

interface DailyOrdersSectionProps {
  orders: Order[];
  onStatusChange: (
    orderId: string,
    newStatus: OrderStatus,
  ) => Promise<void>;
}

const getDateKey = (value?: string | Date) => {
  if (!value) return null;

  // Preserve YYYY-MM-DD date-only values without timezone conversion.
  if (typeof value === "string") {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};

const getDateLabel = (dateKey: string) => {
  const today = getDateKey(new Date());

  if (!today) return "";

  const [year, month, day] = today.split("-").map(Number);
  const tomorrowDate = new Date(year, month - 1, day + 1);

  const tomorrow = getDateKey(tomorrowDate);

  if (dateKey === today) return "Hôm nay";
  if (dateKey === tomorrow) return "Ngày mai";

  return "";
};

const getStatusSummary = (orders: Order[]) => {
  const statuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "completed",
    "cancelled",
  ];

  return statuses
    .map((status) => {
      const count = orders.filter(
        (order) => order.status === status,
      ).length;

      return count > 0 ? `${count} ${status}` : null;
    })
    .filter(Boolean)
    .join(" · ");
};

export default function DailyOrdersSection({
  orders,
  onStatusChange,
}: DailyOrdersSectionProps) {
  const groupedOrders = useMemo(() => {
    const groups: Record<string, Order[]> = {};

    orders
      .filter((order) => order.status !== "pending")
      .forEach((order) => {
        const dateKey = getDateKey(order.deliveryDate) ?? "unknown";

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }

        groups[dateKey].push(order);
      });

    return Object.entries(groups).sort(([a], [b]) => {
      if (a === "unknown") return 1;
      if (b === "unknown") return -1;

      return a.localeCompare(b);
    });
  }, [orders]);

  if (groupedOrders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
        <p className="text-sm font-medium text-gray-600">
          Chưa có đơn hàng để hiển thị.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Các đơn đã xác nhận, hoàn thành hoặc hủy sẽ xuất hiện tại đây.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groupedOrders.map(([dateKey, dailyOrders]) => {
        const label =
          dateKey === "unknown"
            ? "Chưa có ngày giao"
            : formatDate(dateKey);

        const dateBadge =
          dateKey === "unknown" ? "" : getDateLabel(dateKey);

        return (
          <OrderSection
            key={dateKey}
            title={label}
            count={dailyOrders.length}
            description={
              dateKey === "unknown"
                ? "Các đơn chưa được thiết lập ngày giao"
                : getStatusSummary(dailyOrders)
            }
            defaultOpen={true}
          >
            <div className="mb-4 flex items-center gap-2">
              {dateBadge && (
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                  {dateBadge}
                </span>
              )}
            </div>

            <OrderTable
              orders={dailyOrders}
              onStatusChange={onStatusChange}
            />
          </OrderSection>
        );
      })}
    </div>
  );
}