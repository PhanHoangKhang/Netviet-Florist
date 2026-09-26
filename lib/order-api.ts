import { Order } from "@/types/order";

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data?: {
    orderId: string;
  };
}

export async function createOrder(
  data: Order
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
    throw new Error(
      result.message || "Không thể gửi yêu cầu đặt hoa"
    );
  }

  return result;
}