"use client";

// Admin notification bell: unread badge + dropdown of recent orders & applications.
// Opening the panel acknowledges (clears the badge); a snapshot keeps the just-arrived
// items visually highlighted for that viewing. Data + unread logic live in useNotifications.
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import { currency } from "@/utility/format";
import cx from "@/utility/cx";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import ShoppingBagRounded from "@mui/icons-material/ShoppingBagRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import s from "@/styles/admin.module.scss";

export default function NotificationBell() {
  const { t, lang } = useLanguage();
  const n = t.admin.notifications;
  const { items, unreadCount, seenAt, isUnread, markAllSeen } =
    useAdminNotifications();
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState(""); // seenAt captured when the panel was opened
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click / Escape while open.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setSnap(seenAt); // remember what was unread before we clear the badge
    markAllSeen(); // opening the panel acknowledges the notifications
    setOpen(true);
  };

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const fmt = (iso: string) =>
    iso
      ? new Date(iso).toLocaleString(lang === "ar" ? "ar-EG" : "en-GB", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  const recent = items.slice(0, 8);
  const newInView = items.filter((it) => isUnread(it.createdAt, snap)).length;

  return (
    <div className={s.notif} ref={wrapRef}>
      <button
        type="button"
        className={cx(s.notifBtn, open && s.notifBtnOpen)}
        onClick={toggle}
        aria-label={n.title}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <NotificationsRounded />
        {unreadCount > 0 && (
          <span className={s.notifBadge}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className={s.notifPanel} role="menu">
          <div className={s.notifHead}>
            <b>{n.title}</b>
            {newInView > 0 && (
              <span className={s.notifCount}>
                {newInView} {n.newLabel}
              </span>
            )}
          </div>

          <div className={s.notifList}>
            {recent.length === 0 ? (
              <div className={s.notifEmpty}>
                <NotificationsNoneRounded />
                <span>{n.empty}</span>
              </div>
            ) : (
              recent.map((it) => {
                const fresh = isUnread(it.createdAt, snap);
                const href =
                  it.type === "order" ? "/admin/orders" : "/admin/applications";
                return (
                  <button
                    key={it.key}
                    type="button"
                    role="menuitem"
                    className={cx(s.notifItem, fresh && s.unread)}
                    onClick={() => go(href)}
                  >
                    <span
                      className={cx(
                        s.notifIco,
                        it.type === "order" ? s.ord : s.app,
                      )}
                    >
                      {it.type === "order" ? (
                        <ShoppingBagRounded />
                      ) : (
                        <DescriptionRounded />
                      )}
                    </span>
                    <span className={s.notifText}>
                      <span className={s.notifMsg}>
                        {it.type === "order"
                          ? n.orderMsg.replace("{name}", it.customerName)
                          : n.appMsg.replace("{name}", it.fullName)}
                      </span>
                      <span className={s.notifMeta}>
                        {it.type === "order" ? currency(it.total) : it.jobTitle}{" "}
                        · {fmt(it.createdAt)}
                      </span>
                    </span>
                    {fresh && <span className={s.notifDot} />}
                  </button>
                );
              })
            )}
          </div>

          <div className={s.notifFoot}>
            <button
              type="button"
              className={s.notifLink}
              onClick={() => go("/admin/orders")}
            >
              {n.viewOrders}
            </button>
            <button
              type="button"
              className={s.notifLink}
              onClick={() => go("/admin/applications")}
            >
              {n.viewApplications}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
