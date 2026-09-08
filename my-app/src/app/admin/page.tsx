import AdminShell from "@/components/admin/AdminShell";
import DashboardAdmin from "@/components/admin/DashboardAdmin";

export default function AdminHomePage() {
  return (
    <AdminShell>
      <DashboardAdmin />
    </AdminShell>
  );
}
