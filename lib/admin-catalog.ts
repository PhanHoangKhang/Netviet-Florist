import type { Category } from "@/types/category";
import type { Pagination, Product } from "@/types/product";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type ProductQuery = {
  page: number;
  limit: number;
  search: string;
  category: string;
  status: string;
};

type ProductListResponse = ApiResponse<Product[]> & {
  pagination: Pagination;
};

async function readApiResponse<T>(
  response: Response,
  result: ApiResponse<T>,
  fallbackMessage: string,
): Promise<T> {
  if (!response.ok || !result.success) {
    throw new Error(result.message || fallbackMessage);
  }

  return result.data;
}

export async function fetchAdminProducts({
  page,
  limit,
  search,
  category,
  status,
}: ProductQuery): Promise<{ data: Product[]; pagination: Pagination }> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) params.set("search", search.trim());
  if (category !== "all") params.set("category", category);
  if (status !== "all") params.set("status", status);

  const response = await fetch(`/api/admin/products?${params.toString()}`);
  const result = (await response.json()) as ProductListResponse;
  const data = await readApiResponse(
    response,
    result,
    "Không thể lấy sản phẩm",
  );

  return { data, pagination: result.pagination };
}

export async function fetchAdminCategories(): Promise<Category[]> {
  const response = await fetch("/api/admin/categories");
  const result = (await response.json()) as ApiResponse<Category[]>;

  return readApiResponse(response, result, "Không thể lấy danh mục");
}

export function formatAdminDate(date: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
