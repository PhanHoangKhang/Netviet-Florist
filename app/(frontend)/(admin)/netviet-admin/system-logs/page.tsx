
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

type AuditChange = {
  field: string;
  oldValue?: unknown;
  newValue?: unknown;
};

type AuditLogItem = {
  _id: string;
  actorId?: string | null;
  actorEmail: string;
  actorRole?: string;
  action: string;
  resource: string;
  resourceId?: string;
  description: string;
  changes: AuditChange[];
  status: "SUCCESS" | "FAILURE";
  createdAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const ACTIONS = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "ACCESS_DENIED",
];

const RESOURCES = [
  "Product",
  "Category",
  "Order",
  "Admin",
  "Authentication",
  "Upload",
  "Notification",
];

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[var(--color-primary)]";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Không xác định";

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}

function formatValue(value: unknown) {
  if (value === undefined) return "—";
  if (value === null) return "null";

  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function ActionBadge({ action }: { action: string }) {
  const styles: Record<string, string> = {
    CREATE: "bg-emerald-50 text-emerald-700",
    UPDATE: "bg-blue-50 text-blue-700",
    DELETE: "bg-red-50 text-red-700",
    LOGIN: "bg-violet-50 text-violet-700",
    LOGOUT: "bg-gray-100 text-gray-700",
    ACCESS_DENIED: "bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[action] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {action}
    </span>
  );
}

export default function SystemLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [resource, setResource] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(
    null,
  );

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
      });

      if (search) params.set("search", search);
      if (action) params.set("action", action);
      if (resource) params.set("resource", resource);
      if (status) params.set("status", status);
      if (from) params.set("from", from);
      if (to) params.set("to", to);

      const response = await fetch(
        `/api/admin/audit-logs?${params.toString()}`,
        {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Không thể tải lịch sử hoạt động.",
        );
      }

      setLogs(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi tải logs.",
      );
    } finally {
      setLoading(false);
    }
  }, [
    pagination.page,
    pagination.limit,
    search,
    action,
    resource,
    status,
    from,
    to,
  ]);

  useEffect(() => {
    void fetchLogs();
  }, [fetchLogs]);

  const applyFilters = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSearch(searchInput.trim());
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setAction("");
    setResource("");
    setStatus("");
    setFrom("");
    setTo("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const changePage = (nextPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(1, Math.min(nextPage, prev.totalPages || 1)),
    }));
  };

  return (
    <div className="mx-auto max-w-7xl pb-12">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            System Logs
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Theo dõi lịch sử hoạt động và thay đổi dữ liệu trên website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void fetchLogs()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Làm mới
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center text-blue-600">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Tổng bản ghi phù hợp
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {pagination.total.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center  text-violet-600">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Số bản ghi mỗi trang</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {pagination.limit}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center  text-emerald-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Trang hiện tại</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {pagination.totalPages
                  ? `${pagination.page}/${pagination.totalPages}`
                  : "0/0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="mb-6 border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-[var(--color-primary)]" />
          <h2 className="font-semibold text-gray-900">
            Tìm kiếm và bộ lọc
          </h2>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            applyFilters();
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="log-search"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Từ khóa
            </label>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="log-search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Email admin, mô tả hoặc resource ID..."
                className={`${inputClass} pl-9`}
                maxLength={100}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="log-action"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Hành động
            </label>
            <select
              id="log-action"
              value={action}
              onChange={(event) => {
                setAction(event.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={inputClass}
            >
              <option value="">Tất cả hành động</option>
              {ACTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="log-resource"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Module
            </label>
            <select
              id="log-resource"
              value={resource}
              onChange={(event) => {
                setResource(event.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={inputClass}
            >
              <option value="">Tất cả module</option>
              {RESOURCES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="log-status"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Trạng thái
            </label>
            <select
              id="log-status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={inputClass}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="SUCCESS">Thành công</option>
              <option value="FAILURE">Thất bại</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="log-from"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Từ ngày
            </label>
            <input
              id="log-from"
              type="date"
              value={from}
              max={to || undefined}
              onChange={(event) => {
                setFrom(event.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="log-to"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Đến ngày
            </label>
            <input
              id="log-to"
              type="date"
              value={to}
              min={from || undefined}
              onChange={(event) => {
                setTo(event.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={inputClass}
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2  bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Search size={16} />
              Tìm kiếm
            </button>

            <button
              type="button"
              onClick={resetFilters}
              title="Xóa bộ lọc"
              aria-label="Xóa bộ lọc"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2.5 text-gray-600 transition hover:bg-gray-50"
            >
              <X size={17} />
            </button>
          </div>
        </form>
      </section>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => void fetchLogs()}
            className="shrink-0 font-medium underline"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Logs table */}
      <section className="overflow-hidden border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Lịch sử hoạt động
          </h2>
          <span className="text-xs text-gray-500">
            Sắp xếp mới nhất trước
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Thời gian</th>
                <th className="px-5 py-3.5 font-semibold">Người thực hiện</th>
                <th className="px-5 py-3.5 font-semibold">Hành động</th>
                <th className="px-5 py-3.5 font-semibold">Module</th>
                <th className="px-5 py-3.5 font-semibold">Mô tả</th>
                <th className="px-5 py-3.5 font-semibold">Trạng thái</th>
                <th className="px-5 py-3.5 text-right font-semibold">
                  Chi tiết
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <LoaderCircle
                      size={25}
                      className="mx-auto animate-spin text-[var(--color-primary)]"
                    />
                    <p className="mt-3 text-sm text-gray-500">
                      Đang tải lịch sử hoạt động...
                    </p>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Activity
                      size={32}
                      className="mx-auto text-gray-300"
                    />
                    <p className="mt-3 font-medium text-gray-700">
                      Chưa có bản ghi nào
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Thử thay đổi bộ lọc hoặc kiểm tra việc tích hợp ghi log.
                    </p>
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="transition hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {formatDate(log.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {log.actorEmail}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {log.actorRole || "Không rõ role"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <ActionBadge action={log.action} />
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {log.resource}
                      </span>
                      {log.resourceId && (
                        <p className="mt-1 max-w-32 truncate text-xs text-gray-400">
                          ID: {log.resourceId}
                        </p>
                      )}
                    </td>

                    <td className="max-w-xs px-5 py-4 text-gray-600">
                      <p className="line-clamp-2">{log.description}</p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          log.status === "SUCCESS"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {log.status === "SUCCESS"
                          ? "Thành công"
                          : "Thất bại"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        aria-label="Xem chi tiết log"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                      >
                        <Eye size={15} />
                        Xem
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {pagination.total === 0
              ? "Không có bản ghi"
              : `Hiển thị ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(
                  pagination.page * pagination.limit,
                  pagination.total,
                )} / ${pagination.total.toLocaleString("vi-VN")} bản ghi`}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changePage(pagination.page - 1)}
              disabled={loading || pagination.page <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Trước
            </button>

            <span className="px-2 text-sm text-gray-600">
              {pagination.totalPages
                ? `${pagination.page} / ${pagination.totalPages}`
                : "0 / 0"}
            </span>

            <button
              type="button"
              onClick={() => changePage(pagination.page + 1)}
              disabled={
                loading ||
                pagination.page >= pagination.totalPages
              }
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Sau
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLog(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-detail-title"
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div>
                <h2
                  id="audit-detail-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Chi tiết hoạt động
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  ID: {selectedLog._id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                aria-label="Đóng chi tiết"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Mô tả
                </p>
                <p className="text-sm text-gray-800">
                  {selectedLog.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Người thực hiện
                  </p>
                  <p className="break-all text-sm font-medium text-gray-800">
                    {selectedLog.actorEmail}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedLog.actorRole || "Không rõ role"}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Thời gian
                  </p>
                  <p className="text-sm text-gray-800">
                    {formatDate(selectedLog.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Hành động / Module
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <ActionBadge action={selectedLog.action} />
                    <span className="text-sm text-gray-700">
                      {selectedLog.resource}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Trạng thái
                  </p>
                  <p className="text-sm text-gray-800">
                    {selectedLog.status === "SUCCESS"
                      ? "Thành công"
                      : "Thất bại"}
                  </p>
                </div>

                {selectedLog.resourceId && (
                  <div className="sm:col-span-2">
                    <p className="mb-1 text-xs font-medium text-gray-500">
                      Resource ID
                    </p>
                    <p className="break-all font-mono text-xs text-gray-700">
                      {selectedLog.resourceId}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Chi tiết thay đổi
                </h3>

                {!selectedLog.changes?.length ? (
                  <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                    Bản ghi này không có dữ liệu thay đổi trước/sau.
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full min-w-[400px] text-left text-sm">
                      <thead className="bg-gray-50 text-xs text-gray-500">
                        <tr>
                          <th className="px-3 py-2.5">Trường</th>
                          <th className="px-3 py-2.5">Giá trị cũ</th>
                          <th className="px-3 py-2.5">Giá trị mới</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {selectedLog.changes.map((change, index) => (
                          <tr key={`${change.field}-${index}`}>
                            <td className="px-3 py-3 font-medium text-gray-800">
                              {change.field}
                            </td>
                            <td className="max-w-48 whitespace-pre-wrap break-words px-3 py-3 text-red-700">
                              {formatValue(change.oldValue)}
                            </td>
                            <td className="max-w-48 whitespace-pre-wrap break-words px-3 py-3 text-emerald-700">
                              {formatValue(change.newValue)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-100 px-5 py-4">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Đóng
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
