"use client";

interface OrderFiltersProps {
  search: string;
  status: string;
  occasion: string;
  date: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onOccasionChange: (value: string) => void;
  onDateChange: (value: string) => void;

  onSearch: () => void;
}

export default function OrderFilters({
  search,
  status,
  occasion,
  date,
  onSearchChange,
  onStatusChange,
  onOccasionChange,
  onDateChange,
  onSearch,
}: OrderFiltersProps) {
  return (
    <div className="mb-6 border-y border-gray-200 bg-white px-4 py-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}

        <div className="flex gap-2 lg:col-span-1">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Tìm tên, SĐT, email..."
            className="min-w-0 flex-1 border-b border-gray-300 bg-transparent px-1 py-2 text-sm text-[var(--color-text-main)] outline-none placeholder:text-gray-400 focus:border-[var(--color-primary)]"
          />

          <button
            onClick={onSearch}
            className="px-3 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            Tìm
          </button>
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="border-b border-gray-300 bg-white px-1 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="all">
            Tất cả trạng thái
          </option>

          <option value="pending">
            Chờ xác nhận
          </option>

          <option value="confirmed">
            Đã xác nhận
          </option>

          <option value="completed">
            Hoàn thành
          </option>

          <option value="cancelled">
            Đã hủy
          </option>
        </select>

        {/* Occasion */}

        <select
          value={occasion}
          onChange={(e) =>
            onOccasionChange(e.target.value)
          }
          className="border-b border-gray-300 bg-white px-1 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="all">
            Tất cả dịp tặng
          </option>

          <option value="Sinh nhật">
            Sinh nhật
          </option>

          <option value="Kỷ niệm">
            Kỷ niệm
          </option>

          <option value="Chúc mừng">
            Chúc mừng
          </option>

          <option value="Cưới hỏi">
            Cưới hỏi
          </option>

          <option value="Thương nhớ">
            Thương nhớ
          </option>

          <option value="Khác">
            Khác
          </option>
        </select>

        {/* Date */}

        <input
          type="date"
          value={date}
          onChange={(e) =>
            onDateChange(e.target.value)
          }
          className="border-b border-gray-300 bg-white px-1 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
        />
      </div>
    </div>
  );
}