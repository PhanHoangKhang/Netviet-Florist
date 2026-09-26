"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "default" | "compact";
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "default",
}: ProductPaginationProps) {
  const isCompact = variant === "compact";

  if (totalPages <= 1 && !isCompact) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div
      className={
        isCompact
          ? "flex items-center gap-2"
          : "mt-8 flex flex-wrap items-center justify-center gap-2"
      }
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        aria-label="Trang trước"
        className={
          isCompact
            ? "rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
        }
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {isCompact ? (
        <span className="px-2 text-sm text-gray-600">
          Trang {currentPage} / {Math.max(totalPages, 1)}
        </span>
      ) : (
        pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-10 min-w-[42px] rounded-full px-3 text-sm font-semibold transition ${
              page === currentPage
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            }`}
          >
            {page}
          </button>
        ))
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
        className={
          isCompact
            ? "rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
        }
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
