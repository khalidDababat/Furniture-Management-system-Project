"use client";

import { useContext } from "react";
import { AdminNotificationsContext } from "@/context/AdminNotificationsProvider";

export function useAdminNotifications() {
  const ctx = useContext(AdminNotificationsContext);
  if (!ctx) throw new Error("useAdminNotifications must be used within an AdminNotificationsProvider");
  return ctx;
}
