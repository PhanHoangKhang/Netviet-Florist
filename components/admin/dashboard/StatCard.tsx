
import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon: ReactNode;
  loading?: boolean;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  loading = false,
}: StatCardProps) {
  return (
    <div className="border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-500">
            {title}
          </p>

          {loading ? (
            <div className="mt-3 h-8 w-24 animate-pulse rounded-md bg-neutral-100" />
          ) : (
            <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              {value}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-[#4d0d01]">
          {icon}
        </div>
      </div>

      {description && (
        <p className="mt-4 text-xs text-neutral-500">
          {description}
        </p>
      )}
    </div>
  );
}
