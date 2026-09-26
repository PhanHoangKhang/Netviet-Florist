import type { CreateOrderInput } from "@/types/order";
import { GetOrdersResponse, OrderStatus } from "@/types/order";

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data?: {
    orderId: string;
  };
}

export async function createOrder(
  data: CreateOrderInput,
): Promise<CreateOrderResponse> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Không thể gửi yêu cầu đặt hoa");
  }

  return result;
}

interface GetOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  occasion?: string;
  date?: string;
}

export async function getAdminOrders(
  params: GetOrdersParams = {},
): Promise<GetOrdersResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));

  searchParams.set("limit", String(params.limit ?? 10));

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (params.status && params.status !== "all") {
    searchParams.set("status", params.status);
  }

  if (params.occasion && params.occasion !== "all") {
    searchParams.set("occasion", params.occasion);
  }

  if (params.date) {
    searchParams.set("date", params.date);
  }

  const response = await fetch(`/api/orders?${searchParams.toString()}`);

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Không thể lấy danh sách đơn hàng.");
  }

  return result;
}

export async function getAdminOrder(
  orderId: string
) {
  const response = await fetch(
    `/api/orders/${orderId}`
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Không thể lấy thông tin đơn hàng."
    );
  }

  return result.data;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Không thể cập nhật đơn hàng.");
  }

  return result;
}
