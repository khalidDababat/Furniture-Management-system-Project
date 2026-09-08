"use client";

// Shared admin notifications state: ONE polling loop (via useNotifications) feeds both
// the bell (badge + dropdown) and the live toast pop-ups. Items that arrive between polls
// while the admin is active are detected by key-diff and pushed as auto-dismissing toasts.
// A baseline is seeded on first load so the existing backlog is never toasted.
import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useNotifications, type NotifItem } from "@/hooks/useNotifications";

export type Toast = NotifItem; // a toast is a notification item shown transiently

interface AdminNotificationsValue {
  items: NotifItem[];
  loaded: boolean;
  unreadCount: number;
  seenAt: string;
  isUnread: (createdAt: string, since?: string) => boolean;
  markAllSeen: () => void;
  reload: () => Promise<void>;
  toasts: Toast[];
  dismissToast: (key: string) => void;
}

export const AdminNotificationsContext = createContext<AdminNotificationsValue | null>(null);

const MAX_TOASTS = 4;

export function AdminNotificationsProvider({ children }: { children: ReactNode }) {
  const notif = useNotifications();
  const { items, loaded } = notif;
  const [toasts, setToasts] = useState<Toast[]>([]);
  const knownRef = useRef<Set<string> | null>(null);

  // Detect brand-new items between polls and surface them as toasts.
  useEffect(() => {
    if (!loaded) return;
    // First successful load = baseline; don't toast the pre-existing backlog.
    if (knownRef.current === null) {
      knownRef.current = new Set(items.map((i) => i.key));
      return;
    }
    const known = knownRef.current;
    const fresh = items.filter((i) => !known.has(i.key));
    if (!fresh.length) return;
    fresh.forEach((i) => known.add(i.key));
    setToasts((prev) => {
      const additions = fresh.filter((i) => !prev.some((p) => p.key === i.key));
      return [...prev, ...additions].slice(-MAX_TOASTS);
    });
  }, [items, loaded]);

  const dismissToast = useCallback((key: string) => {
    setToasts((prev) => prev.filter((t) => t.key !== key));
  }, []);

  const value = useMemo<AdminNotificationsValue>(
    () => ({ ...notif, toasts, dismissToast }),
    [notif, toasts, dismissToast]
  );

  return <AdminNotificationsContext.Provider value={value}>{children}</AdminNotificationsContext.Provider>;
}
