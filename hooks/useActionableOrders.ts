"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api/fetch-api";

export type ActionableOrder = {
  id: string;
  customerName: string;
  phoneNumber: string;
  occasion: string;
  quantity: number;
  deliveryDate: string | null;
  status: "pending" | "confirmed";
  createdAt: string;
};

type ActionableOrdersResponse = {
  success: boolean;
  data: ActionableOrder[];

  counts: {
    pending: number;
    confirmed: number;
    total: number;
  };
};

const initialCounts = {
  pending: 0,
  confirmed: 0,
  total: 0,
};

export function useActionableOrders() {
  const [orders, setOrders] = useState<ActionableOrder[]>([]);

  const [counts, setCounts] = useState(initialCounts);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI<ActionableOrdersResponse>(
        "/api/admin/dashboard/actionable-orders",
        {
          cache: "no-store",
          errorMessage: "Không thể tải danh sách đơn hàng.",
        },
      );

      setOrders(result.data);
      setCounts(result.counts);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi tải đơn hàng.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    orders,
    counts,
    loading,
    error,
    refresh,
  };
}