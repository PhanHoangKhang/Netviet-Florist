"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface OrderSectionProps {
  title: string;
  count: number;
  children: ReactNode;
  defaultOpen?: boolean;
  description?: string;
  variant?: "default" | "warning";
}

export default function OrderSection({
  title,
  count,
  children,
  defaultOpen = true,
  description,
  variant = "default",
}: OrderSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl bg-white">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-gray-50"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              variant === "warning"
                ? " text-amber-600"
                : " text-gray-600"
            }`}
          >
            {isOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </span>

          <div className="min-w-0">
            <h3 className="font-semibold text-[var(--color-text-main)]">
              {title}
            </h3>

            {description && (
              <p className="mt-0.5 text-xs text-gray-500">{description}</p>
            )}
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            variant === "warning"
              ? " text-amber-700"
              : " text-gray-600"
          }`}
        >
          {count} đơn
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 p-4">
          {children}
        </div>
      )}
    </section>
  );
}