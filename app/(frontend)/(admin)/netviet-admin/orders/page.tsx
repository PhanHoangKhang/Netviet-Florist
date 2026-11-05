"use client";

import { useEffect, useState } from "react";

import OrderFilters from "@/components/admin/order/OrderFilters";
import PendingOrdersSection from "@/components/admin/order/PendingOrdersSection";
import DailyOrdersSection from "@/components/admin/order/DailyOrdersSection";

import {
  Order,
  OrderPagination as Pagination,
  OrderStatus,
} from "@/types/order";

import { getAdminOrders, updateOrderStatus } from "@/lib/order-api";
import ProductPagination from "@/components/ProductPagination";
import { toast } from "sonner";

const PAGE_LIMIT = 10;

export default function OrdersPage() {
  // =========================
  // ORDERS
  // =========================

  const [orders, setOrders] = useState<Order[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);

  // =========================
  // FILTERS
  // =========================

  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [status, setStatus] = useState("all");
  const [occasion, setOccasion] = useState("all");
  const [date, setDate] = useState("");

  // =========================
  // PAGINATION
  // =========================

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const [pendingPagination, setPendingPagination] = useState<Pagination>({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
    totalPages: 0,
  });

  // =========================
  // STATES
  // =========================

  const [loading, setLoading] = useState(true);
  const [pendingLoading, setPendingLoading] = useState(true);

  const [error, setError] = useState("");
  const [pendingError, setPendingError] = useState("");

  const [retry, setRetry] = useState(0);

  const [product, setProduct] = useState("");

  const [deliveryFrom, setDeliveryFrom] = useState("");
  const [deliveryTo, setDeliveryTo] = useState("");

  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");

  // =========================
  // FETCH DAILY ORDERS
  // =========================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getAdminOrders({
          page: pagination.page,
          limit: pagination.limit,
          search: appliedSearch,
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

    fetchOrders();
  }, [
    pagination.page,
    pagination.limit,
    appliedSearch,
    status,
    occasion,
    date,
    retry,
  ]);

  // =========================
  // FETCH ALL PENDING ORDERS
  // =========================

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        setPendingLoading(true);
        setPendingError("");

        const result = await getAdminOrders({
          page: pendingPagination.page,
          limit: pendingPagination.limit,
          search: appliedSearch,
          status: "pending",
          occasion,
          date,
        });

        setPendingOrders(result.data);
        setPendingPagination(result.pagination);
      } catch (error) {
        console.error(error);

        setPendingError(
          error instanceof Error
            ? error.message
            : "Không thể tải đơn chưa xác nhận.",
        );
      } finally {
        setPendingLoading(false);
      }
    };

    fetchPendingOrders();
  }, [
    pendingPagination.page,
    pendingPagination.limit,
    appliedSearch,
    occasion,
    date,
    retry,
  ]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    setAppliedSearch(search);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    setPendingPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setSearch("");
    setAppliedSearch("");
    setProduct("");
    setStatus("all");
    setOccasion("all");
    setDeliveryFrom("");
    setDeliveryTo("");
    setCreatedFrom("");
    setCreatedTo("");

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus,
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      // Update daily orders
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );

      // Update pending orders
      if (newStatus !== "pending") {
        setPendingOrders((prev) =>
          prev.filter((order) => order._id !== orderId),
        );

        setPendingPagination((prev) => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
        }));
      }

      const statusLabels: Record<OrderStatus, string> = {
        pending: "Chờ xác nhận",
        confirmed: "Đã xác nhận",
        completed: "Hoàn thành",
        cancelled: "Đã hủy",
      };

      toast.success(
        `Đã cập nhật đơn hàng #${orderId.slice(-8)}: ${statusLabels[newStatus]}.`,
      );

      // Refresh both lists and their pagination
      setRetry((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      toast.error(
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

    setPendingPagination((prev) => ({
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

    setPendingPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // =========================
  // RETRY
  // =========================

  const handleRetry = () => {
    setRetry((prev) => prev + 1);
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
          onClick={handleRetry}
          className="mt-3 text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex items-end justify-between">
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

      {/* FILTERS */}

      <OrderFilters
        search={search}
        product={product}
        status={status}
        occasion={occasion}
        deliveryFrom={deliveryFrom}
        deliveryTo={deliveryTo}
        createdFrom={createdFrom}
        createdTo={createdTo}
        onSearchChange={setSearch}
        onProductChange={setProduct}
        onStatusChange={handleStatusFilter}
        onOccasionChange={handleOccasionFilter}
        onDeliveryFromChange={setDeliveryFrom}
        onDeliveryToChange={setDeliveryTo}
        onCreatedFromChange={setCreatedFrom}
        onCreatedToChange={setCreatedTo}
        onSearch={handleSearch}
        onClear={handleClearFilters}
      />

      {/* PENDING ORDERS */}

      <PendingOrdersSection
        orders={pendingOrders}
        total={pendingPagination.total}
        loading={pendingLoading}
        currentPage={pendingPagination.page}
        totalPages={pendingPagination.totalPages}
        onPageChange={(page) =>
          setPendingPagination((prev) => ({
            ...prev,
            page,
          }))
        }
        onStatusChange={handleStatusChange}
      />

      {pendingError && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{pendingError}</p>

          <button
            onClick={handleRetry}
            className="text-sm font-medium text-red-700 hover:underline"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* DAILY ORDERS */}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-main)]">
              Đơn hàng theo ngày giao
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Các đơn đã được xử lý, phân loại theo ngày khách nhận hoa.
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {orders.filter((order) => order.status !== "pending").length} đơn
          </span>
        </div>

        <DailyOrdersSection
          orders={orders}
          onStatusChange={handleStatusChange}
        />

        {/* DAILY PAGINATION */}

        {pagination.totalPages > 1 && (
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
        )}
      </section>
    </div>
  );
}
