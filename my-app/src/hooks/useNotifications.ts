"use client";

// Admin notifications: merges new orders + job applications into one recent feed,
// and tracks an "unread" count using a localStorage "last seen" timestamp.
// Polls periodically and on window focus so the bell stays fresh without a websocket.
import { useCallback, useEffect, useState } from "react";
import { adminService } from "@/services/api";
import type { Order, JobApplication } from "@/types";

const SEEN_KEY = "zs_notif_seen";
const POLL_MS = 45_000;

export type NotifItem =
  | {
      key: string;
      type: "order";
      id: number;
      createdAt: string;
      customerName: string;
      total: number;
    }
  | {
      key: string;
      type: "application";
      id: number;
      createdAt: string;
      fullName: string;
      jobTitle: string;
    };

function readSeen(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(SEEN_KEY) || "";
  } catch {
    return "";
  }
}

function toItems(orders: Order[], apps: JobApplication[]): NotifItem[] {
  const merged: NotifItem[] = [
    ...orders.map(
      (o): NotifItem => ({
        key: `order-${o.id}`,
        type: "order",
        id: o.id,
        createdAt: o.createdAt || "",
        customerName: o.customerName,
        total: o.total,
      }),
    ),
    ...apps.map(
      (a, i): NotifItem => ({
        key: `app-${a.id ?? i}`,
        type: "application",
        id: a.id ?? 0,
        createdAt: a.createdAt || "",
        fullName: a.fullName,
        jobTitle: a.jobTitle,
      }),
    ),
  ];
  // Most recent first.
  return merged.sort((a, b) =>
    (b.createdAt || "").localeCompare(a.createdAt || ""),
  );
}

export function useNotifications() {
  const [items, setItems] = useState<NotifItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [seenAt, setSeenAt] = useState<string>(() => readSeen());

  const load = useCallback(async () => {
    try {
      const { orders, applications } =
        await adminService.getAdminNotifications();
      setItems(toItems(orders, applications));
    } catch {
      /* keep last-known items on transient failures */
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, POLL_MS);
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [load]);

  const isUnread = useCallback(
    (createdAt: string, since: string = seenAt) =>
      !since || (createdAt || "") > since,
    [seenAt],
  );

  const unreadCount = items.reduce(
    (n, it) => n + (isUnread(it.createdAt) ? 1 : 0),
    0,
  );

  const markAllSeen = useCallback(() => {
    const now = new Date().toISOString();
    setSeenAt(now);
    try {
      localStorage.setItem(SEEN_KEY, now);
    } catch {
      /* ignore storage failures */
    }
  }, []);

  return {
    items,
    loaded,
    unreadCount,
    seenAt,
    isUnread,
    markAllSeen,
    reload: load,
  };
}
