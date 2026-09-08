import AdminShell from "@/components/admin/AdminShell/AdminShell";
import JobsAdmin from "@/components/admin/JobsAdmin/JobsAdmin";

export default function AdminJobsPage() {
  return (
    <AdminShell>
      <JobsAdmin />
    </AdminShell>
  );
}
