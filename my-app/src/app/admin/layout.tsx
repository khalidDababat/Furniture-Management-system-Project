import { AdminAuthProvider } from "@/context/AdminAuthProvider";

// Admin area has NO storefront chrome — just the auth provider. The signed-in
// shell (sidebar/topbar + route guard) is rendered by <AdminShell> per page.
export const metadata = {
  title: "Admin — Ziad Shakhshir Factory",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
