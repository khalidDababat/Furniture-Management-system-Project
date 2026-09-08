"use client";

import { useEffect, type ReactNode } from "react";
import CloseRounded from "@mui/icons-material/CloseRounded";
import cx from "@/utility/cx";
import styles from "./Modal.module.scss";

export default function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cx(styles.card, wide && styles.wide)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <h3>{title}</h3>
          <button className={styles.close} onClick={onClose} aria-label="close">
            <CloseRounded />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
