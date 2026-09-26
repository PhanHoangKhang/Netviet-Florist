"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import OrderFilters from "@/components/admin/order/OrderFilters";
import OrderTable from "@/components/admin/order/OrderTable";

import {
  Order,
  OrderPagination as Pagination,
  OrderStatus,
} from "@/types/order";

import { getAdminOrders, updateOrderStatus } from "@/lib/order-api";
import ProductPagination from "@/components/ProductPagination";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [status, setStatus] = useState("all");

  const [occasion, setOccasion] = useState("all");

  const [date, setDate] = useState("");

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminOrders({
        page: pagination.page,
        limit: pagination.limit,
        search,
        status,
        occasion,
        date,
      });

      setOrders(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Không thể tải đơn hàng.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {
    fetchOrders();
  }, [pagination.page, pagination.limit, status, occasion, date]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    fetchOrders();
  };

  // =========================
  // STATUS
  // =========================

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus,
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error ? error.message : "Không thể cập nhật đơn hàng.",
      );
    }
  };

  // =========================
  // FILTER HANDLERS
  // =========================

  const handleStatusFilter = (value: string) => {
    setStatus(value);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleOccasionFilter = (value: string) => {
    setOccasion(value);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleDateFilter = (value: string) => {
    setDate(value);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="py-10 text-sm text-gray-500">Đang tải đơn hàng...</div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="py-10">
        <p className="text-sm text-gray-600">{error}</p>

        <button
          onClick={fetchOrders}
          className="mt-3 text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-main)]">
            Đơn hàng
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Theo dõi và xử lý các yêu cầu đặt hoa.
          </p>
        </div>

        <p className="text-sm text-gray-500">{pagination.total} đơn hàng</p>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <OrderFilters
        search={search}
        status={status}
        occasion={occasion}
        date={date}
        onSearchChange={setSearch}
        onStatusChange={handleStatusFilter}
        onOccasionChange={handleOccasionFilter}
        onDateChange={handleDateFilter}
        onSearch={handleSearch}
      />

      {/* =========================
          TABLE
      ========================= */}

      <OrderTable orders={orders} onStatusChange={handleStatusChange} />

      {/* =========================
          PAGINATION
      ========================= */}

      <ProductPagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(page) =>
          setPagination((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </div>
  );
}
