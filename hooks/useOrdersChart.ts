
"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/fetch-api";

export type OrderChartPoint = {
  date: string;
  orders: number;
};

type OrdersChartResponse = {
  success: boolean;
  data: {
    from: string;
    to: string;
    totalOrders: number;
    points: OrderChartPoint[];
  };
};

export function useOrdersChart(from: string, to: string) {
  const [points, setPoints] = useState<OrderChartPoint[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({ from, to });

      const result = await fetchAPI<OrdersChartResponse>(
        `/api/admin/dashboard/orders-chart?${query.toString()}`,
        {
          cache: "no-store",
          errorMessage: "Không thể tải biểu đồ đơn hàng.",
        },
      );

      setPoints(result.data.points);
      setTotalOrders(result.data.totalOrders);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi tải biểu đồ.",
      );
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    void loadChart();
  }, [loadChart]);

  return {
    points,
    totalOrders,
    loading,
    error,
    refresh: loadChart,
  };
}