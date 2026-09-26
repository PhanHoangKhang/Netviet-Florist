import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main area */}
      <div className="lg:pl-64">

        {/* Topbar */}
        <AdminTopbar />

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}