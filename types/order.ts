export type OrderStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface OrderProduct {
  _id: string;
  name: string;
  slug: string;
  images: string[];
}

export interface Order {
  _id: string;

  productId: OrderProduct;

  customerName: string;
  email: string;
  phoneNumber: string;

  deliveryAddress: string;
  deliveryDate?: string;

  occasion: string;
  quantity: number;
  note?: string;

  status: OrderStatus;

  createdAt: string;
  updatedAt: string;
}

export interface OrderPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetOrdersResponse {
  success: boolean;
  data: Order[];
  pagination: OrderPagination;
  message?: string;
}