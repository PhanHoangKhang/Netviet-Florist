
import ActionableOrders from "@/components/admin/dashboard/ActionableOrders";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import OrdersChart from "@/components/admin/dashboard/OrdersChart";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <DashboardStats />
      <OrdersChart />
      <ActionableOrders />
      {/* Sau này thêm biểu đồ, đơn hàng gần đây tại đây */}
    </div>
  );
}
