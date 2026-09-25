"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", String(pagination.page));
      params.set("limit", String(pagination.limit));

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (category !== "all") {
        params.set("category", category);
      }

      // Nếu API admin hỗ trợ status
      if (status !== "all") {
        params.set("status", status);
      }

      const response = await fetch(`/api/admin/products?${params.toString()}`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể lấy sản phẩm");
      }

      setProducts(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
      setError("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể lấy danh mục");
      }

      setCategories(result.data);
    } catch (error) {
      console.error("FETCH CATEGORIES ERROR:", error);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.limit, category, status]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    fetchProducts();
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  // =========================
  // LOADING
  // =========================

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

  // =========================
  // ERROR
  // =========================

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
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>

          <p className="mt-1 text-sm text-gray-500">
            Quản lý các sản phẩm của Nét Việt Florist.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      {/* =========================
          FILTER
      ========================= */}

      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Search */}

          <div className="flex flex-1 gap-2">
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
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />

            <button
              onClick={handleSearch}
              className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Tìm
            </button>
          </div>

          {/* Category */}

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);

              setPagination((prev) => ({
                ...prev,
                page: 1,
              }));
            }}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
          >
            <option value="all">Tất cả danh mục</option>

            {categories.map((item) => (
              <option key={item._id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);

              setPagination((prev) => ({
                ...prev,
                page: 1,
              }));
            }}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
          >
            <option value="all">Tất cả trạng thái</option>

            <option value="inStock">Còn hàng</option>

            <option value="outOfStock">Hết hàng</option>
          </select>
        </div>
      </div>

      {/* =========================
          PRODUCT TABLE
      ========================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-16 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  #
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Sản phẩm
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Danh mục
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Hình ảnh
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Trạng thái
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Ngày tạo
                </th>

                <th className="w-24 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
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
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                              🌸
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">
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
                      </div>
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
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Còn hàng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                          Hết hàng
                        </span>
                      )}
                    </td>

                    {/* Created At */}

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {formatDate(product.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
                      >
                        Sửa
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="text-3xl">🌸</div>

                    <p className="mt-3 text-sm font-medium text-gray-900">
                      Chưa có sản phẩm
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Hãy thêm sản phẩm đầu tiên của Nét Việt Florist.
                    </p>

                    <Link
                      href="/admin/products/new"
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

        {/* =========================
            FOOTER / PAGINATION
        ========================= */}

        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-500">
            Tổng cộng{" "}
            <span className="font-medium text-gray-900">
              {pagination.total}
            </span>{" "}
            sản phẩm
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>

            <span className="px-2 text-sm text-gray-600">
              Trang {pagination.page} / {Math.max(pagination.totalPages, 1)}
            </span>

            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
