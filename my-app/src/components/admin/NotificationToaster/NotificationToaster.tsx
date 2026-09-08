"use client";

// Live toast pop-ups for the admin: renders the transient toasts collected by
// AdminNotificationsProvider (new orders / applications that arrived while the admin
// is active). Each card auto-dismisses, can be closed, and navigates to its screen.
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import { currency } from "@/utility/format";
import cx from "@/utility/cx";
import type { NotifItem } from "@/hooks/useNotifications";
import ShoppingBagRounded from "@mui/icons-material/ShoppingBagRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import s from "@/styles/admin.module.scss";

const AUTO_MS = 6500;

function ToastCard({
  toast,
  onClose,
}: {
  toast: NotifItem;
  onClose: (key: string) => void;
}) {
  const { t, lang } = useLanguage();
  const n = t.admin.notifications;
  const router = useRouter();
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => onClose(toast.key), 240); // let the exit animation play
  }, [onClose, toast.key]);

  // Auto-dismiss after a few seconds.
  useEffect(() => {
    const id = window.setTimeout(close, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [close]);

  const time = toast.createdAt
    ? new Date(toast.createdAt).toLocaleTimeString(
        lang === "ar" ? "ar-EG" : "en-GB",
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      )
    : "";

  const href = toast.type === "order" ? "/admin/orders" : "/admin/applications";
  const go = () => {
    router.push(href);
    close();
  };

  const message =
    toast.type === "order"
      ? n.orderMsg.replace("{name}", toast.customerName)
      : n.appMsg.replace("{name}", toast.fullName);
  const meta =
    toast.type === "order"
      ? `${currency(toast.total)} · ${time}`
      : `${toast.jobTitle} · ${time}`;

  return (
    <div className={cx(s.toast, closing && s.toastClosing)}>
      <button type="button" className={s.toastMain} onClick={go}>
        <span
          className={cx(s.notifIco, toast.type === "order" ? s.ord : s.app)}
        >
          {toast.type === "order" ? (
            <ShoppingBagRounded />
          ) : (
            <DescriptionRounded />
          )}
        </span>
        <span className={s.toastText}>
          <span className={s.toastMsg}>{message}</span>
          <span className={s.toastMeta}>{meta}</span>
        </span>
      </button>
      <button
        type="button"
        className={s.toastClose}
        onClick={close}
        aria-label={t.admin.common.close}
      >
        <CloseRounded />
      </button>
    </div>
  );
}

export default function NotificationToaster() {
  const { toasts, dismissToast } = useAdminNotifications();
  if (!toasts.length) return null;
  return (
    <div className={s.toastWrap} aria-live="polite" aria-atomic="false">
      {toasts.map((tst) => (
        <ToastCard key={tst.key} toast={tst} onClose={dismissToast} />
      ))}
    </div>
  );
}
