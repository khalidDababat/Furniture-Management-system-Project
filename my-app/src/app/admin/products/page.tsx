import AdminShell from "@/components/admin/AdminShell/AdminShell";
import ProductsAdmin from "@/components/admin/ProductsAdmin/ProductsAdmin";

export default function AdminProductsPage() {
  return (
    <AdminShell>
      <ProductsAdmin />
    </AdminShell>
  );
}
