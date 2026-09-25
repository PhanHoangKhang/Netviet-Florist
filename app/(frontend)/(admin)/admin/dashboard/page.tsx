import {
  ClipboardList,
  Clock3,
  Package,
  MessageCircle,
  TrendingUp,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Tổng quan hoạt động của Nét Việt Florist.
        </p>
      </div>

      {/* =========================
          OVERVIEW CARDS
      ========================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Đơn hôm nay
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                8
              </p>

              <p className="mt-2 text-xs text-gray-400">
                So với hôm qua: +2
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Chờ xử lý
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                3
              </p>

              <p className="mt-2 text-xs text-orange-500">
                Cần xử lý sớm
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Sản phẩm
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                42
              </p>

              <p className="mt-2 text-xs text-gray-400">
                6 danh mục
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Package className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Consultations */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Yêu cầu tư vấn
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                5
              </p>

              <p className="mt-2 text-xs text-purple-500">
                2 chưa liên hệ
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <MessageCircle className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="font-semibold text-gray-900">
                Đơn hàng gần đây
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Những đơn đặt hoa mới nhất
              </p>
            </div>

            <button className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] hover:underline">
              Xem tất cả
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            <OrderRow
              customer="Nguyễn Minh Anh"
              product="Bó Hoa Hồng Red Naomi"
              time="10 phút trước"
              status="Chờ xử lý"
              statusClass="bg-orange-50 text-orange-600"
            />

            <OrderRow
              customer="Trần Hoàng Nam"
              product="Lẵng Hoa Khai Trương"
              time="35 phút trước"
              status="Đang chuẩn bị"
              statusClass="bg-blue-50 text-blue-600"
            />

            <OrderRow
              customer="Lê Ngọc Mai"
              product="Chậu Lan Hồ Điệp"
              time="1 giờ trước"
              status="Đã xác nhận"
              statusClass="bg-green-50 text-green-600"
            />

            <OrderRow
              customer="Phạm Gia Hân"
              product="Giỏ Hoa Tulip Trắng"
              time="2 giờ trước"
              status="Hoàn thành"
              statusClass="bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        {/* Order Status */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Trạng thái đơn hàng
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Tổng quan các đơn hiện tại
            </p>
          </div>

          <div className="space-y-5 p-6">
            <StatusRow
              label="Chờ xử lý"
              value={3}
              total={12}
            />

            <StatusRow
              label="Đã xác nhận"
              value={4}
              total={12}
            />

            <StatusRow
              label="Đang chuẩn bị"
              value={2}
              total={12}
            />

            <StatusRow
              label="Đang giao"
              value={2}
              total={12}
            />

            <StatusRow
              label="Hoàn thành"
              value={1}
              total={12}
            />
          </div>
        </div>
      </div>

      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div>
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Thao tác nhanh
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            icon={<Package className="h-5 w-5" />}
            title="Thêm sản phẩm"
            description="Thêm mẫu hoa mới vào cửa hàng"
          />

          <QuickAction
            icon={<ClipboardList className="h-5 w-5" />}
            title="Xem đơn hàng"
            description="Kiểm tra và xử lý đơn mới"
          />

          <QuickAction
            icon={<MessageCircle className="h-5 w-5" />}
            title="Yêu cầu tư vấn"
            description="Xem khách hàng đang cần hỗ trợ"
          />
        </div>
      </div>

      {/* =========================
          NOTICE
      ========================= */}

      <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

        <div>
          <p className="text-sm font-semibold text-gray-800">
            2 yêu cầu tư vấn chưa được liên hệ
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Hãy kiểm tra và liên hệ khách hàng để tránh bỏ sót yêu cầu.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================
   ORDER ROW
========================= */

interface OrderRowProps {
  customer: string;
  product: string;
  time: string;
  status: string;
  statusClass: string;
}

function OrderRow({
  customer,
  product,
  time,
  status,
  statusClass,
}: OrderRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-800">
          {customer}
        </p>

        <p className="mt-1 truncate text-xs text-gray-500">
          {product}
        </p>

        <p className="mt-1 text-[11px] text-gray-400">
          {time}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass}`}
      >
        {status}
      </span>
    </div>
  );
}

/* =========================
   STATUS ROW
========================= */

interface StatusRowProps {
  label: string;
  value: number;
  total: number;
}

function StatusRow({
  label,
  value,
  total,
}: StatusRowProps) {
  const percentage = (value / total) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">
          {label}
        </span>

        <span className="text-xs font-bold text-gray-800">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================
   QUICK ACTION
========================= */

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function QuickAction({
  icon,
  title,
  description,
}: QuickActionProps) {
  return (
    <button className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-[var(--color-primary)] hover:shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition group-hover:bg-[var(--color-primary)] group-hover:text-white">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>
    </button>
  );
}