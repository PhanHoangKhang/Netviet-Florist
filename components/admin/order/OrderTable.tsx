"use client";

import { useState } from "react";
import {
  Order,
  OrderStatus,
} from "@/types/order";
import Link from "next/link";

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (
    orderId: string,
    status: OrderStatus
  ) => Promise<void>;
}

const statusLabels: Record<
  OrderStatus,
  string
> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function OrderTable({
  orders,
  onStatusChange,
}: OrderTableProps) {
  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const formatDate = (date?: string) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const handleStatusChange = async (
    orderId: string,
    status: OrderStatus
  ) => {
    try {
      setUpdatingId(orderId);

      await onStatusChange(
        orderId,
        status
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Đơn hàng
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Khách hàng
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Sản phẩm
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Giao hàng
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Ngày tạo
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center"
                >
                  <p className="text-sm text-gray-500">
                    Không tìm thấy đơn hàng.
                  </p>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-[var(--color-bg-light)]"
                >
                  {/* Order */}

                  <td className="px-5 py-5">
                    <Link
                        href={`/netviet-admin/orders/${order._id}`}
                        className="font-mono text-xs text-gray-500 hover:text-[var(--color-primary)] hover:underline"
                        >
                        #{order._id.slice(-8)}
                    </Link>

                    <p className="mt-1 text-xs text-gray-400">
                      {order.quantity} sản phẩm
                    </p>
                  </td>

                  {/* Customer */}

                  <td className="px-5 py-5">
                    <p className="text-sm font-medium text-gray-900">
                      {order.customerName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {order.phoneNumber}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {order.email}
                    </p>
                  </td>

                  {/* Product */}

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden bg-gray-100">
                        {order.productId?.images?.[0] ? (
                          <img
                            src={
                              order.productId
                                .images[0]
                            }
                            alt={
                              order.productId.name
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div>
                        <Link
                            href={`/netviet-admin/orders/${order._id}`}
                            className="block max-w-[220px] text-sm font-medium text-gray-900 hover:text-[var(--color-primary)] hover:underline"
                            >
                            {order.productId?.name ||
                                "Sản phẩm đã xóa"}
                        </Link>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.occasion}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Delivery */}

                  <td className="px-5 py-5">
                    <p className="max-w-[220px] text-sm text-gray-700">
                      {order.deliveryAddress}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(
                        order.deliveryDate
                      )}
                    </p>
                  </td>

                  {/* Created */}

                  <td className="px-5 py-5">
                    <span className="text-sm text-gray-500">
                      {formatDate(
                        order.createdAt
                      )}
                    </span>
                  </td>

                  {/* Status */}

                  <td className="px-5 py-5">
                    <select
                      value={order.status}
                      disabled={
                        updatingId === order._id
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target
                            .value as OrderStatus
                        )
                      }
                      className="border-b border-gray-300 bg-transparent px-0 py-1 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
                    >
                      {Object.entries(
                        statusLabels
                      ).map(
                        ([
                          value,
                          label,
                        ]) => (
                          <option
                            key={value}
                            value={value}
                          >
                            {label}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}