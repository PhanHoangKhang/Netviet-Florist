"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import LeadModal from "@/components/LeadModal";
import ProductPagination from "@/components/ProductPagination";
import { Search, Filter } from "lucide-react";
import type {
  Product,
  Pagination,
} from "@/types/product";

const CATEGORIES = [
  { id: "all", name: "Tất Cả" },
  { id: "hoa-bo", name: "Hoa Bó" },
  { id: "hoa-gio", name: "Hoa Giỏ / Lẵng" },
  { id: "lan-ho-diep", name: "Lan Hồ Điệp" },
  { id: "hoa-chuc-mung", name: "Hoa Chúc Mừng" },
  { id: "trai-cay", name: "Trái Cây" },
  { id: "hoa-cuoi", name: "Hoa Cưới" },
];

function ProductListContent() {
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<Product[]>([]);

  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const ITEMS_PER_PAGE = 10;

  /* =========================
     SYNC CATEGORY WITH URL
  ========================= */

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }

    setCurrentPage(1);
  }, [categoryParam]);

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set(
          "category",
          selectedCategory
        );

        if (searchQuery.trim()) {
          params.set(
            "search",
            searchQuery.trim()
          );
        }

        params.set(
          "page",
          currentPage.toString()
        );

        params.set(
          "limit",
          ITEMS_PER_PAGE.toString()
        );

        const response = await fetch(
          `/api/products?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Không thể lấy danh sách sản phẩm"
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message ||
              "Không thể lấy sản phẩm"
          );
        }

        setProducts(result.data);
        setPagination(result.pagination);
      } catch (error) {
        console.error(
          "FETCH PRODUCTS ERROR:",
          error
        );

        setError(
          "Không thể tải danh sách sản phẩm."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, currentPage]);

  /* =========================
     CHANGE CATEGORY
  ========================= */

  const handleCategoryChange = (
    category: string
  ) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  /* =========================
     SEARCH
  ========================= */

  const handleSearchChange = (
    value: string
  ) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen py-8 sm:py-12">
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

        {/* Search & Filter */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4">

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Tìm tên mẫu hoa (VD: Hoa hồng, Lan hồ điệp...)"
              value={searchQuery}
              onChange={(e) =>
                handleSearchChange(
                  e.target.value
                )
              }
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
            />

            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Categories */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none pt-2 pb-1">

            <span className="text-xs font-bold text-gray-400 hidden lg:flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Danh mục:
            </span>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  handleCategoryChange(
                    cat.id
                  )
                }
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-[var(--color-primary)] text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-teal-50 hover:text-[var(--color-primary)]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs text-gray-500">
            Hiển thị{" "}
            <strong className="text-gray-800">
              {pagination.total}
            </strong>{" "}
            sản phẩm
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 rounded-2xl p-6 text-center mb-8">
            <p className="text-sm font-semibold">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-400">
              Đang tải sản phẩm...
            </p>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onSelect={(product) =>
                    setSelectedProduct(
                      product
                    )
                  }
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <ProductPagination
                currentPage={
                  pagination.page
                }
                totalPages={
                  pagination.totalPages
                }
                onPageChange={(page) =>
                  setCurrentPage(page)
                }
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
              Vui lòng thử tìm kiếm với từ khóa
              khác hoặc chọn lại danh mục.
            </p>

            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
            >
              Xem Tất Cả Sản Phẩm
            </button>
          </div>
        )}
      </div>

      {/* Lead Modal */}
      <LeadModal
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
      />
    </div>
  );
}

/* =========================
   PAGE
========================= */

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-bg-light)] py-20 text-center text-xs text-gray-400">
          Đang tải sản phẩm...
        </div>
      }
    >
      <ProductListContent />
    </Suspense>
  );
}