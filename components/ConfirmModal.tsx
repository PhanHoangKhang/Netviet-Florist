"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, LoaderCircle, X } from "lucide-react";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  error?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  variant?: "danger" | "primary";
};

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  isLoading = false,
  error,
  onConfirm,
  onCancel,
  variant = "danger",
}: ConfirmModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  const confirmButtonClass =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
      : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]";

  return (
    <div
      className="confirm-modal-backdrop-enter fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onCancel();
        }
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        className="confirm-modal-enter w-full max-w-[420px] border border-gray-200 bg-white p-6 shadow-2xl sm:p-7"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center ${
                variant === "danger"
                  ? " text-red-600"
                  : " text-[var(--color-primary)]"
              }`}
            >
              <AlertTriangle size={20} strokeWidth={1.8} />
            </div>

            <div className="pt-0.5">
              <h2
                id="confirm-modal-title"
                className="text-lg font-semibold tracking-tight text-gray-900"
              >
                {title}
              </h2>

              <p
                id="confirm-modal-description"
                className="mt-2 text-sm leading-6 text-gray-500"
              >
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Đóng hộp thoại"
            className="shrink-0 p-1 text-gray-400 transition hover:text-gray-700 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="mt-5 border-l-2 border-red-500 px-3 py-2 text-sm leading-5 text-red-700"
          >
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="h-10 border border-gray-200 px-4 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={isLoading}
            className={`flex h-10 items-center justify-center gap-2 px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${confirmButtonClass}`}
          >
            {isLoading && (
              <LoaderCircle size={16} className="animate-spin" />
            )}

            {isLoading ? "Đang xử lý..." : confirmText}
          </button>
        </div>
      </section>
    </div>
  );
}