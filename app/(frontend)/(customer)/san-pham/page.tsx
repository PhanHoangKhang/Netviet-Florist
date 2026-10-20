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
        {/* Header */}
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

        {/* Search & Category Slider */}
        <div className="mb-8 space-y-5">
          {/* Search - giữ nguyên chức năng */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder="Tìm tên mẫu hoa (VD: Hoa hồng, Lan hồ điệp...)"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full border border-[var(--color-primary)]/20 bg-transparent py-3 pl-11 pr-4 text-sm text-black outline-none transition-colors placeholder:text-black/50 focus:border-[var(--color-primary)]"
            />

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-primary)]" />
          </div>

          {/* Category slider */}
          <div className="border border-[var(--color-primary)]/10 bg-transparent px-3 py-4 sm:px-5">
            <div className="relative">
              {/* Previous button */}
              <button
                type="button"
                aria-label="Cuộn danh mục sang trái"
                onClick={() =>
                  document.getElementById("category-slider")?.scrollBy({
                    left: -280,
                    behavior: "smooth",
                  })
                }
                className="absolute left-0 top-8 z-10 hidden h-8 w-8
                 items-center justify-center rounded-full
                 border border-[var(--color-primary)]/15
                 bg-white text-[var(--color-primary)] shadow-sm
                 transition hover:bg-[var(--color-bg-light)]
                 md:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Scrollable categories */}
              <div
                id="category-slider"
                className="overflow-x-auto scroll-smooth
                 [scrollbar-width:thin]"
              >
                <div className="flex w-max min-w-full items-start justify-center gap-x-15 px-20 pb-2 md:px-10">
                  {/* All categories */}
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("all")}
                    aria-pressed={selectedCategory === "all"}
                    className="group flex w-[76px] shrink-0 flex-col
                     items-center gap-2"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center
                        rounded-full border transition-colors ${
                          selectedCategory === "all"
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                            : "border-[var(--color-primary)]/20 text-[var(--color-primary)] group-hover:border-[var(--color-primary)]"
                        }`}
                    >
                      <Filter className="h-5 w-5" />
                    </span>

                    <span
                      className={`w-full text-center text-xs leading-4 ${
                        selectedCategory === "all"
                          ? "font-semibold text-[var(--color-primary)]"
                          : "text-[var(--color-text-main)]"
                      }`}
                    >
                      Tất cả
                    </span>
                  </button>

                  {/* Featured products */}
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("featured")}
                    aria-pressed={selectedCategory === "featured"}
                    className="group flex w-[76px] shrink-0 flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-full border transition-colors ${
                        selectedCategory === "featured"
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                          : "border-[var(--color-primary)]/20 text-[var(--color-primary)] group-hover:border-[var(--color-primary)]"
                      }`}
                    >
                      <Star className="h-5 w-5" />
                    </span>

                    <span
                      className={`w-full whitespace-normal break-words text-center text-xs leading-4 ${
                        selectedCategory === "featured"
                          ? "font-semibold text-[var(--color-primary)]"
                          : "text-[var(--color-text-main)]"
                      }`}
                    >
                      Nổi bật
                    </span>
                  </button>

                  {/* Dynamic categories */}
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category.slug;

                    return (
                      <button
                        key={category._id}
                        type="button"
                        onClick={() => handleCategoryChange(category.slug)}
                        aria-pressed={isSelected}
                        className="group flex w-[76px] shrink-0 flex-col
                         items-center gap-2"
                      >
                        <span
                          className={`block h-16 w-16 overflow-hidden rounded-full
                            border p-0.5 transition-colors ${
                              isSelected
                                ? "border-2 border-[var(--color-primary)]"
                                : "border-[var(--color-primary)]/15 group-hover:border-[var(--color-primary)]"
                            }`}
                        >
                          <img
                            src={
                              category.image?.trim() ||
                              "/images/placeholder.jpg"
                            }
                            alt={category.name}
                            loading="lazy"
                            onError={(e) => {
                              if (e.currentTarget.dataset.fallback !== "true") {
                                e.currentTarget.dataset.fallback = "true";
                                e.currentTarget.src = "/images/placeholder.jpg";
                              }
                            }}
                            className="h-full w-full rounded-full object-cover"
                          />
                        </span>

                        <span
                          className={`w-full whitespace-normal break-words text-center text-xs leading-4 ${
                            isSelected
                              ? "font-semibold text-[var(--color-primary)]"
                              : "text-[var(--color-text-main)] group-hover:text-[var(--color-primary)]"
                          }`}
                        >
                          {category.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next button */}
              <button
                type="button"
                aria-label="Cuộn danh mục sang phải"
                onClick={() =>
                  document.getElementById("category-slider")?.scrollBy({
                    left: 280,
                    behavior: "smooth",
                  })
                }
                className="absolute right-0 top-8 z-10 hidden h-8 w-8
                 items-center justify-center rounded-full
                 border border-[var(--color-primary)]/15
                 bg-white text-[var(--color-primary)] shadow-sm
                 transition hover:bg-[var(--color-bg-light)]
                 md:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs text-gray-500">
            Hiển thị{" "}
            <strong className="text-gray-800">{pagination.total}</strong> sản
            phẩm
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 rounded-2xl p-6 text-center mb-8">
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-400">Đang tải sản phẩm...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <ProductPagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        ) : (
          /* Empty State */
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
