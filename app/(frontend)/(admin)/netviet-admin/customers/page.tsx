
"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  RefreshCw,
  MessageCircle,
  LoaderCircle,
  Phone,
  CalendarDays,
} from "lucide-react";

type ConsultationStatus = "new" | "contacted" | "closed";

interface Consultation {
  _id: string;
  name: string;
  phone: string;
  note: string;
  status: ConsultationStatus;
  createdAt: string;
}

const statusLabels: Record<ConsultationStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  closed: "Đã xử lý",
};

const statusClasses: Record<ConsultationStatus, string> = {
  new: "border-amber-200 bg-amber-50 text-amber-700",
  contacted: "border-blue-200 bg-blue-50 text-blue-700",
  closed: "border-green-200 bg-green-50 text-green-700",
};

export default function ConsultationsPage() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: "1",
      });

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (status !== "all") {
        params.set("status", status);
      }

      const response = await fetch(
        `/api/admin/consultations?${params.toString()}`,
        { cache: "no-store" }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Không thể tải yêu cầu tư vấn."
        );
      }

      setItems(result.data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Không thể tải danh sách."
      );
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchItems();
    }, 250);

    return () => clearTimeout(timeout);
  }, [fetchItems]);

  async function updateStatus(
    id: string,
    nextStatus: ConsultationStatus
  ) {
    const toastId = toast.loading("Đang cập nhật trạng thái...");
    setUpdatingId(id);

    try {
      const response = await fetch(
        `/api/admin/consultations/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Không thể cập nhật trạng thái."
        );
      }

      setItems((current) =>
        current.map((item) =>
          item._id === id
            ? { ...item, status: nextStatus }
            : item
        )
      );

      toast.success("Đã cập nhật trạng thái!", {
        id: toastId,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi.",
        { id: toastId }
      );
    } finally {
      setUpdatingId("");
    }
  }

  const newCount = items.filter(
    (item) => item.status === "new"
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MessageCircle
              size={22}
              className="text-[var(--color-primary)]"
            />
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Yêu cầu tư vấn
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Theo dõi và quản lý yêu cầu tư vấn mẫu hoa từ khách hàng.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void fetchItems()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Làm mới
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Yêu cầu trong trang hiện tại
          </p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {items.length}
          </p>
        </div>

        <div className="border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Yêu cầu mới trong trang hiện tại
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">
            {newCount}
          </p>
        </div>

        <div className="border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Trạng thái quản lý
          </p>
          <p className="mt-2 text-sm font-medium text-gray-800">
            Mới → Đã liên hệ → Đã xử lý
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm tên, số điện thoại hoặc nội dung..."
            className="w-full border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="new">Mới</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="closed">Đã xử lý</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Khách hàng</th>
                <th className="px-5 py-4">Nội dung tư vấn</th>
                <th className="px-5 py-4">Ngày gửi</th>
                <th className="px-5 py-4">Trạng thái</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <LoaderCircle
                      size={22}
                      className="mx-auto animate-spin text-[var(--color-primary)]"
                    />
                    <p className="mt-3 text-sm text-gray-500">
                      Đang tải yêu cầu...
                    </p>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-16 text-center"
                  >
                    <MessageCircle
                      size={28}
                      className="mx-auto text-gray-300"
                    />
                    <p className="mt-3 text-sm font-medium text-gray-700">
                      Chưa có yêu cầu tư vấn
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Các yêu cầu mới sẽ xuất hiện ở đây.
                    </p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="align-top transition hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-5">
                      <p className="font-medium text-gray-900">
                        {item.name}
                      </p>

                      <a
                        href={`tel:${item.phone}`}
                        className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:underline"
                      >
                        <Phone size={13} />
                        {item.phone}
                      </a>
                    </td>

                    <td className="max-w-sm whitespace-pre-wrap break-words px-5 py-5 text-sm leading-6 text-gray-600">
                      {item.note || "Không có ghi chú."}
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={14} />
                        {new Date(item.createdAt).toLocaleString(
                          "vi-VN",
                          {
                            timeZone: "Asia/Ho_Chi_Minh",
                          }
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className={`inline-flex border px-2.5 py-1 text-xs font-medium ${statusClasses[item.status]}`}
                        >
                          {statusLabels[item.status]}
                        </span>

                        <select
                          aria-label={`Trạng thái yêu cầu của ${item.name}`}
                          value={item.status}
                          disabled={updatingId === item._id}
                          onChange={(event) =>
                            void updateStatus(
                              item._id,
                              event.target.value as ConsultationStatus
                            )
                          }
                          className="max-w-full border border-gray-200 bg-white px-2 py-2 text-xs outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
                        >
                          <option value="new">Mới</option>
                          <option value="contacted">
                            Đã liên hệ
                          </option>
                          <option value="closed">
                            Đã xử lý
                          </option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-400">
          Hiển thị tối đa 20 yêu cầu mới nhất trên mỗi trang.
        </div>
      </div>
    </div>
  );
}
