export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  image: string;
  imageKey: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface UploadedImage {
  url: string;
  key: string;
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Đã xảy ra lỗi.");
  }

  return result as ApiResponse<T>;
}

export async function getCategory(id: string) {
  const response = await fetch(
    `/api/admin/categories/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  return parseResponse<CategoryFormData>(response);
}

export async function updateCategory(
  id: string,
  data: CategoryFormData,
) {
  const response = await fetch(
    `/api/admin/categories/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  return parseResponse<CategoryFormData>(response);
}

export async function uploadCategoryImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "category");

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const result = await parseResponse<UploadedImage>(response);
  return result.data;
}
