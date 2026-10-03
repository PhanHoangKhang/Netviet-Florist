"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductPagination from "@/components/ProductPagination";
import {
  fetchAdminCategories,
  fetchAdminProducts,
  formatAdminDate,
} from "@/lib/admin-catalog";
import type { Category } from "@/types/category";
import type { Product, Pagination } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này không?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể xóa sản phẩm.");
      }

      await fetchProducts();
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      alert("Không thể xóa sản phẩm.");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await fetchAdminProducts({
        page: pagination.page,
        limit: pagination.limit,
        search,
        category,
        status,
      });
      setProducts(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
      setError("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategories(await fetchAdminCategories());
    } catch (error) {
      console.error("FETCH CATEGORIES ERROR:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.limit, category, status]);

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    fetchProducts();
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>

          <p className="mt-1 text-sm text-gray-500">
            Quản lý các sản phẩm của Nét Việt Florist.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />

          <p className="mt-3 text-sm text-gray-500">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>

          <p className="mt-1 text-sm text-gray-500">
            Quản lý các sản phẩm của Nét Việt Florist.
          </p>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-700">{error}</p>

          <button
            onClick={fetchProducts}
            className="mt-3 text-sm font-medium text-red-700 underline"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Catalog
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-text-main)]">
            Sản phẩm
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Quản lý các mẫu hoa của Nét Việt Florist.
          </p>
        </div>

        <Link
          href="/netviet-admin/products/new"
          className="bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="mb-5 border-y border-gray-200 bg-white">
        <div className="flex flex-col gap-3 p-4 md:flex-row">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="min-w-0 flex-1 border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
            />

            <button
              onClick={handleSearch}
              className="border border-l-0 border-[var(--color-primary)] bg-[var(--color-primary)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Tìm
            </button>
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPagination((prev) => ({
                ...prev,
                page: 1,
              }));
            }}
            className="border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[var(--color-primary)]"
          >
            <option value="all">Tất cả danh mục</option>

            {categories.map((item) => (
              <option key={item._id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPagination((prev) => ({
                ...prev,
                page: 1,
              }));
            }}
            className="border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[var(--color-primary)]"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="inStock">Còn hàng</option>
            <option value="outOfStock">Hết hàng</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="w-16 px-6 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  #
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Sản phẩm
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Danh mục
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Ảnh
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Trạng thái
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Ngày tạo
                </th>

                <th className="w-32 px-6 py-4 text-right text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product._id} className="transition hover:bg-gray-50">
                    {/* Number */}

                    <td className="px-6 py-4 text-sm text-gray-400">
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </td>

                    {/* Product */}

                    <td className="px-6 py-4">
                      <Link
                        href={`/netviet-admin/products/${product._id}/edit`}
                        className="group flex items-center gap-4"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover transition group-hover:opacity-90"
                            />
                          ) : (
                            <img
                              src="/logo.png"
                              alt="Nét Việt Florist Logo"
                              className="mx-auto h-12 w-12 rounded-full border border-gray-100 object-contain"
                            />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 transition group-hover:text-[var(--color-primary)]">
                              {product.name}
                            </p>

                            {product.isFeatured && (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                                Nổi bật
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-gray-400">
                            {product.slug}
                          </p>
                        </div>
                      </Link>
                    </td>

                    {/* Category */}

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {product.categoryId?.name || "Chưa phân loại"}
                      </span>
                    </td>

                    {/* Images */}

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {product.images?.length || 0} ảnh
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            product.inStock ? "bg-emerald-500" : "bg-gray-400"
                          }`}
                        />

                        <span
                          className={
                            product.inStock ? "text-gray-700" : "text-gray-400"
                          }
                        >
                          {product.inStock ? "Còn hàng" : "Hết hàng"}
                        </span>
                      </div>
                    </td>

                    {/* Created At */}

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {formatAdminDate(product.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-4">
                        <Link
                          href={`/netviet-admin/products/${product._id}/edit`}
                          className="text-sm font-medium text-gray-500 transition-colors hover:text-[var(--color-primary)]"
                        >
                          Sửa
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className="text-sm font-medium text-gray-400 transition-colors hover:text-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <p className="mt-3 text-sm font-medium text-gray-900">
                      Chưa có sản phẩm
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Hãy thêm sản phẩm đầu tiên của Nét Việt Florist.
                    </p>

                    <Link
                      href="/netviet-admin/products/new"
                      className="mt-4 inline-block text-sm font-medium text-gray-900 underline"
                    >
                      + Thêm sản phẩm
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-500">
            Tổng cộng{" "}
            <span className="font-medium text-gray-900">
              {pagination.total}
            </span>{" "}
            sản phẩm
          </p>

          <ProductPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            variant="compact"
            onPageChange={(page) =>
              setPagination((prev) => ({ ...prev, page }))
            }
          />
        </div>
      </div>
    </div>
  );
}
