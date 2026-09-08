"use client";

// Simulated admin auth for this phase: credentials are checked against JSON Server
// (/admins) via the Axios api layer, and the signed-in admin is persisted in
// localStorage. Swap for real auth (JWT/session) in a later phase.
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { adminService } from "@/services/api";
import type { Admin } from "@/types";

interface AdminAuthValue {
  admin: Admin | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  update: (patch: Partial<Admin>) => Promise<void>;
}

function toSafe(a: Admin): Admin {
  return {
    id: a.id,
    name: a.name,
    email: a.email,
    role: a.role,
    phone: a.phone,
    avatar: a.avatar,
  };
}

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);
const KEY = "zs_admin";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setAdmin(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = (a: Admin | null) => {
    setAdmin(a);
    try {
      if (a) localStorage.setItem(KEY, JSON.stringify(a));
      else localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const found = await adminService.loginAdmin(email, password);
    if (!found) return false;
    persist(toSafe(found));
    return true;
  }, []);

  const logout = useCallback(() => persist(null), []);

  const update = useCallback(
    async (patch: Partial<Admin>) => {
      if (!admin) return;
      const updated = await adminService.updateAdmin(admin.id, patch);
      persist(toSafe(updated));
    },
    [admin],
  );

  const value = useMemo<AdminAuthValue>(
    () => ({ admin, ready, login, logout, update }),
    [admin, ready, login, logout, update],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
