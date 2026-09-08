import { get, post, put, remove } from "./api";
import type { Staff } from "@/types";

export const StaffService = {
  getStaff() {
    return get<Staff[]>("/staff");
  },

  createStaff(body: Omit<Staff, "id">) {
    return post<Staff>("/staff", body);
  },

  updateStaff(id: number, body: Partial<Staff>) {
    return put<Staff>(`/staff/${id}`, body);
  },
  deleteStaff(id: number) {
    return remove(`/staff/${id}`);
  },
};
