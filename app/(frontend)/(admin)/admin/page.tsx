export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Tổng quan hoạt động của Nét Việt Florist.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Đơn hôm nay
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            8
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Chờ xử lý
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            3
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Sản phẩm
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            42
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Đang giao
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            2
          </p>
        </div>
      </div>
    </div>
  );
}