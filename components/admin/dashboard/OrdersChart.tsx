
"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useOrdersChart } from "@/hooks/useOrdersChart";

type Preset = "7d" | "30d" | "90d" | "custom";

function getVietnamToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function shiftDate(dateString: string, amount: number) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + amount));

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function formatDate(date: string) {
  const [, month, day] = date.split("-");
  return `${day}/${month}`;
}

const presets: { label: string; value: Preset; days: number }[] = [
  { label: "7 ngày", value: "7d", days: 7 },
  { label: "30 ngày", value: "30d", days: 30 },
  { label: "90 ngày", value: "90d", days: 90 },
];

export default function OrdersChart() {
  const today = getVietnamToday();

  const [preset, setPreset] = useState<Preset>("7d");
  const [customFrom, setCustomFrom] = useState(
    shiftDate(today, -6),
  );
  const [customTo, setCustomTo] = useState(today);

  const { from, to } = useMemo(() => {
    if (preset === "custom") {
      return { from: customFrom, to: customTo };
    }

    const selected = presets.find((item) => item.value === preset)!;

    return {
      from: shiftDate(today, -(selected.days - 1)),
      to: today,
    };
  }, [preset, customFrom, customTo, today]);

  const { points, totalOrders, loading, error, refresh } =
    useOrdersChart(from, to);

  const validCustomRange =
    preset !== "custom" ||
    (customFrom !== "" && customTo !== "" && customFrom <= customTo);

  const chartData = points.map((point) => ({
    ...point,
    label: formatDate(point.date),
  }));

  return (
    <section className="border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Thống kê đơn hàng
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Số đơn được tạo theo thời gian
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {presets.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPreset(item.value)}
              className={`px-3 py-2 text-sm font-medium transition ${
                preset === item.value
                  ? "bg-[#4d0d01] text-white"
                  : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPreset("custom")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              preset === "custom"
                ? "bg-[#4d0d01] text-white"
                : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            Tùy chỉnh
          </button>
        </div>
      </div>

      {preset === "custom" && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-col gap-1.5 text-sm text-neutral-600">
            Từ ngày
            <input
              type="date"
              value={customFrom}
              max={customTo || today}
              onChange={(event) => setCustomFrom(event.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 outline-none focus:border-[#4d0d01]"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-neutral-600">
            Đến ngày
            <input
              type="date"
              value={customTo}
              min={customFrom}
              max={today}
              onChange={(event) => setCustomTo(event.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 outline-none focus:border-[#4d0d01]"
            />
          </label>
        </div>
      )}

      <div className="mt-6">
        <p className="text-sm text-neutral-500">
          Tổng số đơn trong khoảng thời gian
        </p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">
          {loading ? "—" : totalOrders.toLocaleString("vi-VN")}
        </p>
      </div>

      {!validCustomRange ? (
        <p className="mt-6 text-sm text-amber-700">
          Vui lòng chọn khoảng ngày hợp lệ.
        </p>
      ) : error ? (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="mt-2 font-medium underline underline-offset-4"
          >
            Thử tải lại
          </button>
        </div>
      ) : loading ? (
        <div className="mt-6 h-[280px] animate-pulse rounded-lg bg-neutral-100" />
      ) : totalOrders === 0 ? (
        <div className="mt-6 flex h-[280px] items-center justify-center rounded-lg bg-neutral-50 text-sm text-neutral-500">
          Chưa có đơn hàng trong khoảng thời gian này.
        </div>
      ) : (
        <div className="mt-6 h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -20, bottom: 4 }}
            >
              <CartesianGrid
                stroke="#e5e5e5"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tick={{ fill: "#737373", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                minTickGap={16}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#737373", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "#4d0d01", fillOpacity: 0.05 }}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #e5e5e5",
                  fontSize: 13,
                }}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.date ?? ""
                }
                formatter={(value) => [
                  `${Number(value).toLocaleString("vi-VN")} đơn`,
                  "Số đơn",
                ]}
              />

              <Bar
                dataKey="orders"
                name="Số đơn"
                fill="#4d0d01"
                radius={[5, 5, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-400">
        Thời gian tính theo múi giờ Việt Nam (UTC+7).
      </p>
    </section>
  );
}
