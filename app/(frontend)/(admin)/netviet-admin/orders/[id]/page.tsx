"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import {
  getAdminOrder,
  updateOrderStatus,
} from "@/lib/order-api";

import {
  Order,
  OrderStatus,
} from "@/types/order";

const statusLabels: Record<
  OrderStatus,
  string
> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updating, setUpdating] =
    useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { id } = await params;

        const data = await getAdminOrder(id);

        setOrder(data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Không thể tải đơn hàng."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [params]);

  const handleStatusChange = async (
    status: OrderStatus
  ) => {
    if (!order) return;

    try {
      setUpdating(true);

      await updateOrderStatus(
        order._id,
        status
      );

      setOrder((prev) =>
        prev
          ? {
              ...prev,
              status,
            }
          : prev
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Không thể cập nhật trạng thái."
      );
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (
    date?: string
  ) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat(
      "vi-VN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    ).format(new Date(date));
  };

  const formatDateTime = (
    date?: string
  ) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat(
      "vi-VN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="py-10 text-sm text-gray-500">
        Đang tải đơn hàng...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-10">
        <p className="text-sm text-gray-600">
          {error ||
            "Không tìm thấy đơn hàng."}
        </p>

        <Link
          href="/netviet-admin/orders"
          className="mt-4 inline-block text-sm text-[var(--color-primary)] hover:underline"
        >
          ← Quay lại đơn hàng
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <Link
          href="/netviet-admin/orders"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại đơn hàng
        </Link>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs text-gray-400">
              #{order._id}
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-main)]">
              Chi tiết đơn hàng
            </h1>
          </div>

          <select
            value={order.status}
            disabled={updating}
            onChange={(e) =>
              handleStatusChange(
                e.target.value as OrderStatus
              )
            }
            className="border-b border-gray-300 bg-transparent px-1 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
          >
            {Object.entries(
              statusLabels
            ).map(([value, label]) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-8 lg:col-span-2">
          {/* PRODUCT */}

          <section className="border-y border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-medium text-gray-900">
                Sản phẩm
              </h2>
            </div>

            <div className="flex gap-5 p-5">
              <div className="h-28 w-28 shrink-0 overflow-hidden bg-gray-100">
                {order.productId?.images?.[0] && (
                  <img
                    src={
                      order.productId.images[0]
                    }
                    alt={
                      order.productId.name
                    }
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900">
                  {order.productId?.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Số lượng:{" "}
                  {order.quantity}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Dịp tặng:{" "}
                  {order.occasion}
                </p>
              </div>
            </div>
          </section>

          {/* DELIVERY */}

          <section className="border-y border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-medium text-gray-900">
                Thông tin giao hàng
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-5 sm:grid-cols-2">
              <Info
                label="Địa chỉ"
                value={
                  order.deliveryAddress
                }
              />

              <Info
                label="Ngày giao"
                value={formatDate(
                  order.deliveryDate
                )}
              />

              <Info
                label="Ghi chú"
                value={
                  order.note || "Không có"
                }
              />
            </div>
          </section>

          {/* NOTE */}

          {order.note && (
            <section className="border-y border-gray-200 bg-white px-5 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Ghi chú khách hàng
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {order.note}
              </p>
            </section>
          )}
        </div>

        {/* RIGHT */}

        <div className="space-y-8">
          {/* CUSTOMER */}

          <section className="border-y border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-medium text-gray-900">
                Khách hàng
              </h2>
            </div>

            <div className="space-y-5 p-5">
              <Info
                label="Họ và tên"
                value={
                  order.customerName
                }
              />

              <Info
                label="Số điện thoại"
                value={
                  order.phoneNumber
                }
              />

              <Info
                label="Email"
                value={order.email}
              />
            </div>
          </section>

          {/* ORDER INFO */}

          <section className="border-y border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-medium text-gray-900">
                Thông tin đơn hàng
              </h2>
            </div>

            <div className="space-y-5 p-5">
              <Info
                label="Mã đơn"
                value={`#${order._id.slice(
                  -8
                )}`}
              />

              <Info
                label="Trạng thái"
                value={
                  statusLabels[
                    order.status
                  ]
                }
              />

              <Info
                label="Ngày tạo"
                value={formatDateTime(
                  order.createdAt
                )}
              />

              <Info
                label="Cập nhật"
                value={formatDateTime(
                  order.updatedAt
                )}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm leading-6 text-gray-800">
        {value}
      </p>
    </div>
  );
}