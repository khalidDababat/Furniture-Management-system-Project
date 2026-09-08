import { get, post, remove, patch } from "./api";
import type { Order } from "@/types";

export const orderService = {
  /* ---------------- Orders ---------------- */
  getOrders() {
    return get<Order[]>("/orders");
  },
  getOrder(id: number | string) {
    return get<Order>(`/orders/${id}`);
  },
  createOrder(body: Omit<Order, "id">) {
    return post<Order>("/orders", body);
  },

  updateOrderStatus(id: number, status: Order["status"]) {
    return patch<Order>(`/orders/${id}`, { status });
  },

  deleteOrder(id: number) {
    return remove(`/orders/${id}`);
  },
};
