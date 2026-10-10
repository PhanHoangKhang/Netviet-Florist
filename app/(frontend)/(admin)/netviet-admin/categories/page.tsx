
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderTree,
  Plus,
  Search,
  Pencil,
  Trash2,
  LoaderCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  productCount?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmCategory, setConfirmCategory] =
    useState<CategoryItem | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/categories");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể tải danh mục.");
      }

      setCategories(result.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải danh mục.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const deleteCategory = async () => {
    if (!confirmCategory) return;

    setDeletingId(confirmCategory._id);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/categories/${confirmCategory._id}`,
        { method: "DELETE" },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể xóa danh mục.");
      }

      setCategories((prev) =>
        prev.filter((item) => item._id !== confirmCategory._id),
      );

      toast.success(`Đã xóa danh mục "${confirmCategory.name}".`);
      setConfirmCategory(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không thể xóa danh mục.";
      setError(message);
      toast.error(message);
      setConfirmCategory(null);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const keyword = search.trim().toLowerCase();

    return (
      category.name.toLowerCase().includes(keyword) ||
      category.slug.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="mx-auto max-w-7xl pb-12">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Danh mục
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Quản lý các danh mục sản phẩm của Nét Việt Florist.
          </p>
        </div>

        <Link
          href="/netviet-admin/categories/new"
          className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus size={17} />
          Thêm danh mục
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6 border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center bg-[#F1E6DC] text-[var(--color-primary)]">
            <FolderTree size={21} strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Tổng danh mục</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {categories.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 border border-gray-200 bg-white p-4">
        <div className="relative max-w-md">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc slug..."
            className="w-full border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <div className="mb-5 flex items-center justify-between border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Đóng">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 bg-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <LoaderCircle size={25} className="animate-spin" />
            <p className="mt-3 text-sm">Đang tải danh mục...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <FolderTree
              size={32}
              strokeWidth={1.3}
              className="mx-auto text-gray-300"
            />
            <p className="mt-4 text-sm font-medium text-gray-800">
              {search ? "Không tìm thấy danh mục" : "Chưa có danh mục"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Thử tìm với từ khóa khác."
                : "Tạo danh mục đầu tiên cho cửa hàng."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Danh mục
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F1E6DC] text-[var(--color-primary)]">
                          <FolderTree size={18} strokeWidth={1.6} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {category.name}
                          </p>
                          {category.description && (
                            <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {category.slug}
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {category.productCount ?? "—"}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/netviet-admin/categories/${category._id}/edit`}
                          aria-label={`Sửa ${category.name}`}
                          className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-500 transition hover:border-gray-400 hover:text-gray-900"
                        >
                          <Pencil size={15} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setConfirmCategory(category)}
                          disabled={deletingId === category._id}
                          aria-label={`Xóa ${category.name}`}
                          className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          {deletingId === category._id ? (
                            <LoaderCircle size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredCategories.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 text-sm text-gray-500">
            Hiển thị {filteredCategories.length} / {categories.length} danh mục
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {confirmCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
            className="w-full max-w-md border border-gray-200 bg-white p-6"
          >
            <h2
              id="delete-category-title"
              className="text-lg font-semibold text-gray-900"
            >
              Xóa danh mục?
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Bạn có chắc muốn xóa{" "}
              <span className="font-medium text-gray-900">
                {confirmCategory.name}
              </span>
              ? Hãy đảm bảo API kiểm tra sản phẩm đang sử dụng danh mục
              này trước khi xóa.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmCategory(null)}
                className="border border-gray-200 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={deleteCategory}
                disabled={deletingId !== null}
                className="flex items-center gap-2 bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId && (
                  <LoaderCircle size={15} className="animate-spin" />
                )}
                Xóa danh mục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
