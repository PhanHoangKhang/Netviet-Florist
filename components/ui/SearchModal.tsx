"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = [
  "Hoa sinh nhật",
  "Hoa cưới",
  "Hoa khai trương",
  "Bó hoa",
  "Giỏ hoa",
  "Hoa hồng",
  "Hoa lan",
];

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // =========================
  // CLOSE MODAL
  // =========================

  const closeModal = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const keyword = query.trim();

    if (!keyword || isSearching) return;

    try {
      setIsSearching(true);

      const params = new URLSearchParams({
        search: keyword,
        page: "1",
        limit: "12",
      });

      // Kiểm tra và tải kết quả trước khi chuyển trang
      const response = await fetch(`/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Không thể tìm kiếm sản phẩm");
      }

      // Chỉ chuyển trang sau khi API trả về thành công
      closeModal();

      router.push(`/san-pham?search=${encodeURIComponent(keyword)}`);
    } catch (error) {
      console.error("Search error:", error);
      alert("Không thể tìm kiếm sản phẩm. Vui lòng thử lại.");
    } finally {
      setIsSearching(false);
    }
  };

  // =========================
  // KEYBOARD & FOCUS
  // =========================

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      // Focus trap
      if (event.key === "Tab") {
        const dialog = document.getElementById("product-search-dialog");

        const focusable = dialog?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), a[href]",
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);

      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [open, closeModal]);

  // =========================
  // HIDDEN
  // =========================

  if (!open) return null;

  // =========================
  // RENDER
  // =========================

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 pt-[10vh] backdrop-blur-[3px] sm:pt-[15vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        id="product-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm sản phẩm hoa"
        className="w-full max-w-2xl overflow-hidden bg-white shadow-2xl"
      >
        {/* SEARCH HEADER */}

        <form
          onSubmit={handleSearch}
          className="flex h-14 items-center gap-3 bg-[var(--color-primary)] px-4 text-white"
        >
          <Search size={19} strokeWidth={1.5} />

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm hoa..."
            aria-label="Tìm kiếm hoa"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Xóa từ khóa"
              className="text-white/70 transition-colors hover:text-white"
            >
              <X size={17} />
            </button>
          )}

          <div className="h-5 w-px bg-white/25" />

          <button
            type="button"
            onClick={closeModal}
            aria-label="Đóng tìm kiếm"
            className="text-xs text-white/70 transition-colors hover:text-white"
          >
            ESC
          </button>
        </form>

        {/* CONTENT */}

        <div className="min-h-[260px] p-6 sm:min-h-[320px]">
          {/* RECENT SEARCH SUGGESTIONS */}

          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-wider text-gray-400">
              Gợi ý tìm kiếm
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className={`border px-3 py-2 text-xs transition-colors ${
                    query === item
                      ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                      : "border-gray-200 text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH INSTRUCTION */}

          <div className="mt-10 border-t border-gray-100 pt-5">
            {query.trim() ? (
              <p className="text-sm text-gray-500">
                Tìm kiếm sản phẩm với từ khóa{" "}
                <span className="font-medium text-[var(--color-text-main)]">
                  "{query.trim()}"
                </span>
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                Nhập tên sản phẩm hoặc chọn một gợi ý để bắt đầu.
              </p>
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={closeModal}
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={!query.trim() || isSearching}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isSearching ? "Đang tìm..." : "Tìm kiếm"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
