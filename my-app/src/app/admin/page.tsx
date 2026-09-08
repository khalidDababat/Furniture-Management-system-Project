import AdminShell from "@/components/admin/AdminShell/AdminShell";
import DashboardAdmin from "@/components/admin/DashboardAdmin/DashboardAdmin";

export default function AdminHomePage() {
  return (
    <AdminShell>
      <DashboardAdmin />
    </AdminShell>
  );
}
