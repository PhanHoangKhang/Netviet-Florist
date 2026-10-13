
"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/fetch-api";

export type DashboardOverview = {
  ordersToday: number;
  orderValueToday: number;
  pendingOrders: number;
  totalProducts: number;
};

type OverviewResponse = {
  success: boolean;
  data: DashboardOverview;
};

export function useDashboardOverview() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    try {
      setError(null);

      const result = await fetchAPI<OverviewResponse>(
        "/api/admin/dashboard/overview",
        {
          cache: "no-store",
          errorMessage: "Không thể tải thống kê dashboard.",
        },
      );

      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi không xác định.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchOverview();
  }, [fetchOverview]);

  return {
    data,
    loading,
    error,
    refresh: fetchOverview,
  };
}
