import { get, post, put, remove, patch } from "./api";
import type { Admin, JobApplication, Order } from "@/types";
import { orderService } from "./order";

export const adminService = {
  async loginAdmin(email: string, password: string): Promise<Admin | null> {
    const admins = await get<Admin[]>(
      `/admins?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    );
    return admins[0] ?? null;
  },

  async adminEmailExists(email: string): Promise<boolean> {
    const admins = await get<Admin[]>(
      `/admins?email=${encodeURIComponent(email)}`,
    );
    return admins.length > 0;
  },

  /* ---------------- Admin: profile ---------------- */
  updateAdmin(id: number, body: Partial<Admin>) {
    return patch<Admin>(`/admins/${id}`, body);
  },

  /* ---------------- Admin: Applications ---------------- */
  getApplications() {
    return get<JobApplication[]>("/applications");
  },
  deleteApplication(id: number) {
    return remove(`/applications/${id}`);
  },
  /* ---------------- Admin: notifications feed ---------------- */
  async getAdminNotifications(): Promise<{
    orders: Order[];
    applications: JobApplication[];
  }> {
    const [orders, applications] = await Promise.all([
      orderService.getOrders(),
      adminService.getApplications(),
    ]);
    return { orders, applications };
  },

  // Submit a job application to JSON Server (creates a row under /applications).
  submitApplication(payload: Omit<JobApplication, "id" | "createdAt">) {
    return post<JobApplication>("/applications", {
      ...payload,
      createdAt: new Date().toISOString(),
    });
  },
};
