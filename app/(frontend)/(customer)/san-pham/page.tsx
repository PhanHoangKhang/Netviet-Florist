"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductPagination from "@/components/ProductPagination";
import { Search, Filter, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Product, Pagination } from "@/types/product";
import ContactSection from "@/components/ContactSection";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

function ProductListContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Không thể lấy danh mục");
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("FETCH CATEGORIES ERROR:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }

    setCurrentPage(1);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(searchParam ?? "");
    setCurrentPage(1);
  }, [searchParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set("category", selectedCategory);

        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        params.set("page", currentPage.toString());

        params.set("limit", ITEMS_PER_PAGE.toString());

        const response = await fetch(`/api/products?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Không thể lấy danh sách sản phẩm");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Không thể lấy sản phẩm");
        }

        setProducts(result.data);
        setPagination(result.pagination);
      } catch (error) {
        console.error("FETCH PRODUCTS ERROR:", error);

        setError("Không thể tải danh sách sản phẩm.");

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
            Nét Việt{" "}
            <span className="text-[var(--color-secondary)] font-semibold uppercase tracking-widest">
              Florist
            </span>
          </span>

          <h1 className="text-2xl pt-2 sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Bộ Sưu Tập Hoa Tươi
          </h1>
        </div>

        {/* SEARCH BAR - TOP */}
        <div className="relative w-full mb-8">
          <input
            type="text"
            placeholder="Tìm tên mẫu hoa (VD: Hoa hồng, Lan hồ điệp...)"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border border-[var(--color-primary)]/20 bg-transparent py-3 pl-11 pr-4 text-sm text-black outline-none transition-colors placeholder:text-black/50 focus:border-[var(--color-primary)]"
          />

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-primary)]" />
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[20%_minmax(0,1fr)]">
          {/* LEFT SIDEBAR - CATEGORY */}
          {/* Category filter */}
          <div className="lg:hidden">
            <p className="mb-3 text-sm font-semibold text-[var(--color-text-main)]">
              Danh Mục Sản Phẩm
            </p>

            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full cursor-pointer border border-[#eee7e4] bg-white px-4 py-3 text-sm text-[var(--color-text-main)] outline-none transition-colors hover:border-[var(--color-primary)] focus:border-[var(--color-primary)]"
            >
              <option value="all">Tất cả sản phẩm</option>
              <option value="featured">Sản phẩm nổi bật</option>

              {categories.map((category) => (
                <option key={category._id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <aside className="hidden lg:block h-fit border border-[var(--color-primary)]/10 bg-transparent p-4 sm:p-5">
            <h2 className="mb-5 text-sm font-bold text-[var(--color-primary)]">
              Danh Mục Sản Phẩm
            </h2>

            <div className="space-y-1">
              {/* ALL CATEGORIES */}
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                aria-pressed={selectedCategory === "all"}
                className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[var(--color-primary)] text-white font-semibold"
                    : "text-[var(--color-text-main)] hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Tất cả sản phẩm
                </span>
              </button>

              {/* FEATURED PRODUCTS */}
              <button
                type="button"
                onClick={() => handleCategoryChange("featured")}
                aria-pressed={selectedCategory === "featured"}
                className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition-colors ${
                  selectedCategory === "featured"
                    ? "bg-[var(--color-primary)] text-white font-semibold"
                    : "text-[var(--color-text-main)] hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Sản phẩm nổi bật
                </span>
              </button>

              <div className="my-3 border-t border-[var(--color-primary)]/10" />

              {/* DYNAMIC CATEGORIES */}
              {categories.map((category) => {
                const isSelected = selectedCategory === category.slug;

                return (
                  <button
                    key={category._id}
                    type="button"
                    onClick={() => handleCategoryChange(category.slug)}
                    aria-pressed={isSelected}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-[var(--color-bg-light)] font-semibold text-[var(--color-primary)]"
                        : "text-[var(--color-text-main)] hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[var(--color-primary)]/15">
                      <img
                        src={
                          category.image?.trim() || "/images/placeholder.jpg"
                        }
                        alt={category.name}
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.dataset.fallback !== "true") {
                            e.currentTarget.dataset.fallback = "true";
                            e.currentTarget.src = "/images/placeholder.jpg";
                          }
                        }}
                        className="h-full w-full object-cover"
                      />
                    </span>

                    <span className="min-w-0 flex-1 break-words">
                      {category.name}
                    </span>

                    {isSelected && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT CONTENT - PRODUCTS */}
          <section className="min-w-0">
            {/* RESULT COUNT */}
            <div className="mb-6 flex items-center justify-between px-1">
              <p className="text-xs text-gray-500">
                Hiển thị{" "}
                <strong className="text-gray-800">{pagination.total}</strong>{" "}
                sản phẩm
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 text-red-600 rounded-2xl p-6 text-center mb-8">
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* LOADING */}
            {loading ? (
              <div className="py-20 text-center">
                <p className="text-sm text-gray-400">Đang tải sản phẩm...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                {/* PRODUCT GRID */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* PAGINATION */}
                {pagination.totalPages > 1 && (
                  <ProductPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                )}
              </>
            ) : (
              /* EMPTY STATE */
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xs my-8">
                <p className="text-sm font-semibold text-gray-600">
                  Không tìm thấy sản phẩm phù hợp.
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn lại danh mục.
                </p>

                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="mt-4 px-4 py-2 rounded-sm bg-[var(--color-primary)] text-white text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
                >
                  Xem Tất Cả Sản Phẩm
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-20 text-center text-xs text-gray-400">
          Đang tải sản phẩm...
        </div>
      }
    >
      <ProductListContent />
      <ContactSection />
    </Suspense>
  );
}
