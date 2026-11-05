"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

interface OrderFiltersProps {
  search: string;
  product: string;
  status: string;
  occasion: string;

  deliveryFrom: string;
  deliveryTo: string;

  createdFrom: string;
  createdTo: string;

  onSearchChange: (value: string) => void;
  onProductChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onOccasionChange: (value: string) => void;

  onDeliveryFromChange: (value: string) => void;
  onDeliveryToChange: (value: string) => void;

  onCreatedFromChange: (value: string) => void;
  onCreatedToChange: (value: string) => void;

  onSearch: () => void;
  onClear: () => void;
}

const inputClass =
  "w-full border-b border-gray-300 bg-transparent px-1 py-2.5 text-sm text-[var(--color-text-main)] outline-none transition-colors focus:border-[var(--color-primary)] placeholder:text-gray-400";

const selectClass =
  "w-full border-b border-gray-300 bg-white px-1 py-2.5 text-sm text-[var(--color-text-main)] outline-none transition-colors focus:border-[var(--color-primary)]";

const labelClass =
  "mb-1.5 block text-xs font-medium text-gray-500";

export default function OrderFilters({
  search,
  product,
  status,
  occasion,
  deliveryFrom,
  deliveryTo,
  createdFrom,
  createdTo,

  onSearchChange,
  onProductChange,
  onStatusChange,
  onOccasionChange,

  onDeliveryFromChange,
  onDeliveryToChange,

  onCreatedFromChange,
  onCreatedToChange,

  onSearch,
  onClear,
}: OrderFiltersProps) {
  const hasFilters = Boolean(
    search ||
      product ||
      status !== "all" ||
      occasion !== "all" ||
      deliveryFrom ||
      deliveryTo ||
      createdFrom ||
      createdTo,
  );

  return (
    <div className="mb-8 border-y border-gray-200 bg-white">
      {/* BASIC FILTERS */}

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-4 py-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}

        <div className="lg:col-span-2">
          <label className={labelClass}>
            Tìm kiếm đơn hàng
          </label>

          <div className="flex items-center gap-2 border-b border-gray-300 transition-colors focus-within:border-[var(--color-primary)]">
            <Search
              size={16}
              strokeWidth={1.5}
              className="shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
              placeholder="Mã đơn hàng, tên, số điện thoại, email..."
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[var(--color-text-main)] outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Product */}

        <div>
          <label className={labelClass}>
            Sản phẩm
          </label>

          <input
            type="text"
            value={product}
            onChange={(e) =>
              onProductChange(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
            placeholder="Tên hoặc mã sản phẩm"
            className={inputClass}
          />
        </div>

        {/* Status */}

        <div>
          <label className={labelClass}>
            Trạng thái đơn hàng
          </label>

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value)
            }
            className={selectClass}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        {/* Occasion */}

        <div>
          <label className={labelClass}>
            Dịp tặng
          </label>

          <select
            value={occasion}
            onChange={(e) =>
              onOccasionChange(e.target.value)
            }
            className={selectClass}
          >
            <option value="all">Tất cả dịp</option>
            <option value="Sinh nhật">Sinh nhật</option>
            <option value="Kỷ niệm">Kỷ niệm</option>
            <option value="Chúc mừng">Chúc mừng</option>
            <option value="Cưới hỏi">Cưới hỏi</option>
            <option value="Thương nhớ">Thương nhớ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
      </div>

      {/* ADVANCED FILTERS */}

      <details className="group border-t border-gray-100">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm text-gray-600 transition-colors hover:text-[var(--color-primary)]">
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal size={15} strokeWidth={1.5} />
            Bộ lọc nâng cao
          </span>

          <span className="text-xs text-gray-400 group-open:hidden">
            Mở rộng
          </span>

          <span className="hidden text-xs text-gray-400 group-open:block">
            Thu gọn
          </span>
        </summary>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-gray-100 px-4 py-5 md:grid-cols-2">
          {/* Delivery date */}

          <div>
            <p className="mb-3 text-sm font-medium text-gray-800">
              Ngày giao hàng
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Từ</label>

                <input
                  type="date"
                  value={deliveryFrom}
                  max={deliveryTo || undefined}
                  onChange={(e) =>
                    onDeliveryFromChange(e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Đến</label>

                <input
                  type="date"
                  value={deliveryTo}
                  min={deliveryFrom || undefined}
                  onChange={(e) =>
                    onDeliveryToChange(e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Created date */}

          <div>
            <p className="mb-3 text-sm font-medium text-gray-800">
              Ngày tạo đơn
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Từ</label>

                <input
                  type="datetime-local"
                  value={createdFrom}
                  max={createdTo || undefined}
                  onChange={(e) =>
                    onCreatedFromChange(e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Đến</label>

                <input
                  type="datetime-local"
                  value={createdTo}
                  min={createdFrom || undefined}
                  onChange={(e) =>
                    onCreatedToChange(e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </details>

      {/* ACTIONS */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={14} />
          Xóa bộ lọc
        </button>

        <button
          type="button"
          onClick={onSearch}
          className="border-b border-[var(--color-primary)] px-1 py-2 text-sm font-medium text-[var(--color-primary)] transition-opacity hover:opacity-70"
        >
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  );
}