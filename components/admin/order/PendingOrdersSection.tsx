"use client";

import { Order } from "@/types/order";
import OrderTable from "@/components/admin/order/OrderTable";
import OrderSection from "./OrderSection";
import { OrderStatus } from "@/types/order";
import ProductPagination from "@/components/ProductPagination";

interface PendingOrdersSectionProps {
  orders: Order[];
  total: number;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onStatusChange: (
    orderId: string,
    newStatus: OrderStatus,
  ) => Promise<void>;
}

export default function PendingOrdersSection({
  orders,
  loading,
  total,
  currentPage,
  totalPages,
  onPageChange,
  onStatusChange,
}: PendingOrdersSectionProps) {
  return (
    <OrderSection
      title="Chưa xác nhận"
      description="Các đơn hàng đang chờ shop xử lý"
      count={total}
      variant="warning"
      defaultOpen={true}
    >
      {loading ? (
        <p className="py-6 text-center text-sm text-gray-500">
          Đang tải đơn chưa xác nhận...
        </p>
      ) : orders.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            Không có đơn hàng nào đang chờ xác nhận.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Tất cả đơn hàng đã được xử lý.
          </p>
        </div>
      ) : (
        <>
          <OrderTable
            orders={orders}
            onStatusChange={onStatusChange}
          />

          <div className="mt-4">
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </OrderSection>
  );
}