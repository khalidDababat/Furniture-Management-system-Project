import AdminShell from "@/components/admin/AdminShell/AdminShell";
import OrdersAdmin from "@/components/admin/OrdersAdmin/OrdersAdmin";

export default function AdminOrdersPage() {
  return (
    <AdminShell>
      <OrdersAdmin />
    </AdminShell>
  );
}
